// import axios from 'axios';
import {NextRequest, NextResponse} from 'next/server';
import OpenAI from "openai";
import process from "process";
import {APIPromise} from "openai/core";

const openai = new OpenAI();

export async function POST(request: NextRequest) {
    let data;
    let run;
    try {
        data = await request.json();
        console.log("data")
        console.log(data)
    } catch (e) {
        return NextResponse.json({status: 'error', message: 'Invalid JSON'})
    }
    if (data.hasOwnProperty("prompt")) {
        if (data.prompt == "wow") throw Error;
        if (data.hasOwnProperty("threadId") && data.threadId == "") {
            run = await createThreadAndRunStreamPromise(data.prompt);
        } else run = await createRunStreamPromise(data.prompt, data.threadId);
        console.log("run")
        console.log(run);
        const message = await getThreadMessages(run.threadId);
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
                if (event.event === "thread.run.step.completed") if (event.data.status === 'completed') resolve({
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
                    if (event.data.status === 'completed') resolve({"threadId": threadId, "runId": event.data.run_id});
                    else reject(new RunError());
            }
        } catch (error: any) {
            reject(error);
        }
    });
}

async function getThreadMessages(threadId: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
        const threadMessages = await openai.beta.threads.messages.list(
            threadId
        );
        const assistantMessage = threadMessages.data.filter(message => message.role === 'assistant')
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];

        if (!assistantMessage) reject(new NoAssistantMessageError());
        if (assistantMessage.content[0].type == 'text') resolve(assistantMessage.content[0].text.value);
        else reject(new NoAssistantMessageError());
    });
}

async function getRun(threadId: string, runId: string): Promise<any> {
    const assistantId = process.env.ASSISTANT_ID;
    if (!assistantId) throw new NoAssistantIdError();

    return new Promise(async (resolve, reject) => {
        try {
            const run = await openai.beta.threads.runs.retrieve(threadId, runId);
            resolve(run);
        } catch (error: any) {
            reject(error.message);
        }
    });
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