"use client";
import React, {useState, useEffect, useCallback} from "react";
import styles from "@styles/modules/_page.module.scss";
import useJuanGPT from "@components/JuanGPT/useJuanGPT";
import PromptForm from "@components/JuanGPT/PromptForm";
import Thread from "@components/JuanGPT/Thread";
import useSessionStorage from "@contexts/useSessionStorage";

const JuanGPT: React.FC = () => {
    const {prompt, setPrompt, response, loading, error, handleSubmit, clearThread} = useJuanGPT();
    const [thread, setThread] = useState<Array<{ prompt: string; response: string; isError: boolean }>>([]);
    const [currentPrompt, setCurrentPrompt] = useState("");
    const [threadId, setThreadId] = useSessionStorage("threadId");

    const updateThread = useCallback(() => {
        if (!loading && (response || error) && currentPrompt) {
            setThread(prevThread => {
                const lastItem = prevThread[prevThread.length - 1];
                if (lastItem && lastItem.prompt === currentPrompt) {
                    return prevThread; // Don't add if it's the same as the last item
                }
                return [
                    ...prevThread,
                    {
                        prompt: currentPrompt,
                        response: error ? `Error: ${error}` : response,
                        isError: !!error
                    }
                ];
            });
            setCurrentPrompt(""); // Clear current prompt after adding to thread
        }
    }, [loading, response, error, currentPrompt]);

    useEffect(() => {
        updateThread();
    }, [updateThread]);

    const handleThreadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!prompt.trim()) return;
        setCurrentPrompt(prompt);
        setPrompt("");
        await handleSubmit(e);
    };

    const handleNewThread = useCallback(() => {
        setThread([]);
        setCurrentPrompt("");
        setPrompt("");
        clearThread();
    }, [clearThread, setPrompt]);

    // Effect to clear the thread when threadId is empty
    useEffect(() => {
        if (!threadId) {
            setThread([]);
        }
    }, [threadId]);

    return (
        <div className={styles.gpt}>
            <h2 className={styles.gpt_header}>
                Want to know more about my career, or how I can help transform your idea into reality?
            </h2>
            <p className={styles.gpt_info}>
                Ask this AI anything about my career, skills or experience. Or, if you are
                wondering how and if I can help you, enter details about what you&apos;re trying to accomplish!
            </p>
            <p className={styles.gpt_subheader}>Ask Away!</p>
            <Thread thread={thread} currentPrompt={currentPrompt} isLoading={loading}/>
            <PromptForm
                onSubmit={handleThreadSubmit}
                isLoading={loading}
                prompt={prompt}
                setPrompt={setPrompt}
                onNewThread={handleNewThread}
            />
        </div>
    );
};

export default JuanGPT;
