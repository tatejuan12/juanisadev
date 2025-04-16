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
            run = await createThreadAndRunStreamPromise(data.prompt);
        } else run = await createRunStreamPromise(data.prompt, data.threadId);

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

async function createThreadAndRunStreamPromise(prompt: string): Promise<any> {
    const assistantId = process.env.ASSISTANT_ID;

    if (!assistantId) throw new NoAssistantIdError();
    if (!prompt || prompt == "") throw PromptEmptyError;

    return new Promise(async (resolve, reject) => {
        try {
            const stream = await openai.beta.threads.createAndRun({
                assistant_id: assistantId,
                thread: {
                    messages: [{
                        role: "user",
                        content: prompt
                    }]
                },
                stream: true
            })
            for await (const event of stream) {
                if (event.event === "thread.run.step.completed")
                    if (event.data.status === 'completed') resolve({
                        "threadId": event.data.thread_id,
                        "runId": event.data.run_id
                    }); else reject(new RunError());
            }
        } catch (error: any) {
            reject(error);
        }
    });
}

async function createRunStreamPromise(prompt: string, threadId: string): Promise<any> {
    const assistantId = process.env.ASSISTANT_ID;

    if (!assistantId) throw new NoAssistantIdError();
    if (!prompt || prompt == "") throw PromptEmptyError;

    return new Promise(async (resolve, reject) => {
        try {
            // Create a message
            await openai.beta.threads.messages.create(threadId, {
                role: "user",
                content: prompt
            });

            // Create a run
            const stream = await openai.beta.threads.runs.create(threadId, {
                assistant_id: assistantId,
                stream: true
            });

            for await (const event of stream) {
                if (event.event === "thread.run.step.completed")
                    if (event.data.status === 'completed')
                        resolve({"threadId": threadId, "runId": event.data.run_id});
                    else reject(new RunError());
            }
        } catch (error: any) {
            reject(error);
        }
    });
}

async function getThreadMessages(threadId: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const threadMessages = await openai.beta.threads.messages.list(
                threadId
            );
            const assistantMessage = threadMessages.data.filter(message => message.role === 'assistant')
                .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];
            if (!assistantMessage) reject(new NoAssistantMessageError());
            const textMessage = getTextFromMessage(assistantMessage);
            if (!textMessage || !textMessage.text) reject(new NoTextMessageError());
            resolve(textMessage.text.value)
        } catch (error) {
            reject(error);
        }
    });

    function getTextFromMessage(assistantMessage: any): any | undefined {

        return assistantMessage.content.find(c => c.type === 'text');
    }
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