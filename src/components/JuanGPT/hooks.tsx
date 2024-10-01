import { useState } from 'react';

const hooks = () => {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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
                throw new Error('Failed to fetch response');
            }

            const data = await res.json();
            setResponse(data.data.prompt);
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while fetching the response.');
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

export default hooks;
