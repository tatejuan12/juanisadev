// import axios from 'axios';
import {NextRequest, NextResponse} from 'next/server';
import OpenAI from "openai";
import process from "process";
import {logRun} from "./database";
import sendTelegramNotification from "./telegramNotifier";

const openai = new OpenAI();

export async function POST(request: NextRequest) {
    let data: { threadId: string; prompt: string; };
    let run: { threadId: string; runId: string; };

    try {
        data = await request.json();
        console.log("data")
        console.log(data)
    } catch (e) {
        return NextResponse.json({status: 'error', message: 'Invalid JSON'})
    }

    if (data.hasOwnProperty("prompt")) {
        if (data.hasOwnProperty("threadId") && data.threadId == "") {
            run = await createThreadAndRun(data.prompt);
        } else run = await createRun(data.prompt, data.threadId);

        const message = await getThreadMessages(run.threadId);

        logRun(run.threadId, run.runId, data.prompt, message);
        sendTelegramNotification(data.prompt, message)

        return NextResponse.json({
            status: 'success', data: {
                prompt: message,
                threadId: run.threadId
            }
        })
    }


    return NextResponse.json({status: 'ok'})
}

async function pollRunStatus(threadId: string, runId: string): Promise<OpenAI.Beta.Threads.Runs.Run> {
    return new Promise(async (resolve, reject) => {
        const poll = async () => {
            try {
                const run = await openai.beta.threads.runs.retrieve(threadId, runId);
                if (run.status === 'completed') {
                    resolve(run);
                } else if (run.status === 'requires_action') {
                    // Handle required actions if necessary
                    reject(new Error("Run requires action, which is not handled."));
                } else if (run.status === 'failed' || run.status === 'cancelled' || run.status === 'expired') {
                    reject(new Error(`Run ended with status: ${run.status}`));
                } else {
                    setTimeout(poll, 500); // Poll every 500ms
                }
            } catch (error) {
                reject(error);
            }
        };
        await poll();
    });
}

async function createThreadAndRun(prompt: string): Promise<{ threadId: string, runId: string }> {
    const assistantId = process.env.ASSISTANT_ID;

    if (!assistantId) throw new NoAssistantIdError();
    if (!prompt || prompt == "") throw new PromptEmptyError();

    const run = await openai.beta.threads.createAndRun({
        assistant_id: assistantId,
        thread: {
            messages: [{
                role: "user",
                content: prompt
            }]
        },
    });

    await pollRunStatus(run.thread_id, run.id);

    return {threadId: run.thread_id, runId: run.id};
}

async function createRun(prompt: string, threadId: string): Promise<{ threadId: string, runId: string }> {
    const assistantId = process.env.ASSISTANT_ID;

    if (!assistantId) throw new NoAssistantIdError();
    if (!prompt || prompt == "") throw new PromptEmptyError();

    await openai.beta.threads.messages.create(threadId, {
        role: "user",
        content: prompt
    });

    const run = await openai.beta.threads.runs.create(threadId, {
        assistant_id: assistantId,
    });

    await pollRunStatus(run.thread_id, run.id);

    return {threadId: run.thread_id, runId: run.id};
}

async function getThreadMessages(threadId: string, maxRetries = 5, initialDelay = 400): Promise<string> {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        const threadMessages = await openai.beta.threads.messages.list(threadId, { order: 'desc', limit: 20 });

        const assistantMessage = threadMessages.data.find(m => m.role === 'assistant');

        if (assistantMessage) {
            const textContent = assistantMessage.content.find(c => c.type === 'text');
            
            if (textContent && 'text' in textContent) {
                const textValue = textContent.text.value;
                if (textValue) {
                    return textValue;
                }
            }
        }

        if (attempt < maxRetries - 1) {
            const delay = initialDelay * Math.pow(2, attempt);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    throw new NoAssistantMessageError();
}

class NoAssistantIdError extends Error {
    constructor() {
        super('ASSISTANT_ID is not set');
    }
}

class PromptEmptyError extends Error {
    constructor() {
        super('Prompt is empty');
    }
}

class RunError extends Error {
    constructor() {
        super('Run failed');
    }
}

class NoAssistantMessageError extends Error {
    constructor() {
        super('No assistant message found');
    }
}

class NoTextMessageError extends Error {
    constructor() {
        super('Assistant Message did not have a text message');
    }
}