import React from 'react';
import styles from "@styles/modules/_page.module.scss";
import {ClearAllSvg} from "@components/JuanGPT/svgs/clearAllSvg";

interface PromptFormProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isLoading: boolean;
    prompt: string;
    setPrompt: (prompt: string) => void;
    onNewThread: () => void;
}

const PromptForm: React.FC<PromptFormProps> = ({onSubmit, isLoading, prompt, setPrompt, onNewThread}) => (
    <form className={styles.gpt_input} onSubmit={onSubmit}>
    <textarea
        className={styles.gpt_input_prompt}
        placeholder="Enter prompt:"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
    />
        <div className={styles.gpt_input_buttons}>
            <button type="button" className={styles.gpt_input_buttons_newthread} onClick={onNewThread}>
                <ClearAllSvg/>
            </button>
            <button className={styles.gpt_input_buttons_submit} disabled={isLoading}>
                {isLoading ? "Thinking..." : "Ask JuanGPT"}
            </button>
        </div>
    </form>
);

export default PromptForm;