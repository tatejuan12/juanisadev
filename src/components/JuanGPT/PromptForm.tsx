import React from 'react';
import styles from "@styles/modules/_page.module.scss";

interface PromptFormProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isLoading: boolean;
    prompt: string;
    setPrompt: (prompt: string) => void;
}

const PromptForm: React.FC<PromptFormProps> = ({ onSubmit, isLoading, prompt, setPrompt }) => (
    <form className={styles.gpt_input} onSubmit={onSubmit}>
    <textarea
        className={styles.gpt_input_prompt}
        placeholder="Enter prompt:"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
    />
        <button className={styles.gpt_input_submit} disabled={isLoading}>
            {isLoading ? "Thinking..." : "Ask JuanGPT"}
        </button>
    </form>
);

export default PromptForm;