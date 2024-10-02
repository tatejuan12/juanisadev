import { useState } from 'react';

const useJuanGPT = () => {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (prompt.trim() === "") {
            alert("Please enter a prompt.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/juangpt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            if (!res.ok) {
                if (res.status === 404) {
                    throw new Error('API endpoint not found.');
                } else {
                    throw new Error('Failed to fetch response.');
                }
            }

            const data = await res.json();
            setResponse(data.data.prompt);
        } catch (error) {
            console.error('Error:', error);
            if (error instanceof Error && error.message.includes('404')) {
                setError('API endpoint not found.');
            } else if (error instanceof TypeError) {
                setError('Network error. Please check your connection.');
            } else {
                setError('An unexpected error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        prompt,
        setPrompt,
        response,
        loading,
        error,
        handleSubmit,
    };
};

export default useJuanGPT;
