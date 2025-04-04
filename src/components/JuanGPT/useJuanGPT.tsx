import {useCallback, useState} from 'react';
import useSessionStorage from "@contexts/useSessionStorage";

const useJuanGPT = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [threadId, setThreadId] = useSessionStorage("threadId");


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (prompt.trim() === '') {
            setError('Please enter a prompt.');
            return;
        }

        setLoading(true);
        setError(null);
        // setThreadId("thread_1UTfZK3C90a1zJQAeex4TNm7");
        const sendData: any = {
            prompt: prompt,
            threadId: threadId
        }
        try {
            const res = await fetch('/api/juangpt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sendData),
            });

            if (!res.ok) {
                // Handle HTTP errors gracefully, providing specific messages if possible
                if (res.status === 404) {
                    throw new Error('API endpoint not found.');
                } else if (res.status === 400) {
                    const errorData = await res.json(); // Assuming error details are in JSON
                    throw new Error(errorData.message || 'Bad Request');
                } else {
                    throw new Error('Failed to fetch response from server.');
                }
            }

            const data = await res.json();
            setResponse(data.data.prompt);
            if (threadId == "") setThreadId(data.data.threadId);
        } catch (error) {
            // More specific error handling if needed, but now we're not catching locally thrown errors.
            console.error('Error during fetch:', error);
            setError('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };
    const clearThread = useCallback(() => {
        setThreadId("");
        setResponse("");
        setError(null);
    }, [setThreadId]);


    return {
        prompt,
        setPrompt,
        response,
        loading,
        error,
        handleSubmit,
        clearThread: clearThread,
    };
};

export default useJuanGPT;