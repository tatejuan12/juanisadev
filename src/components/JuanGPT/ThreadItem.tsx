import React from 'react';
import ReactMarkdown from 'react-markdown';
import useTypewriter from '@components/JuanGPT/Typewriter';
import styles from "@styles/modules/_page.module.scss";

interface ThreadItemProps {
    prompt: string;
    response: React.ReactNode;
    isError?: boolean;
    isLoading?: boolean;
}

const ThreadItem: React.FC<ThreadItemProps> = ({ prompt, response, isError, isLoading }) => {
    const typewriterText = typeof response === 'string' ? useTypewriter(response, 1) : response;

    return (
        <div className={styles.gpt_thread_item}>
            <div className={styles.gpt_thread_item_prompt}>{prompt}</div>
            <div className={`${styles.gpt_thread_item_response} ${isError ? styles.gpt_thread_error : ''}`}>
                {typeof typewriterText === 'string' ? <ReactMarkdown>{typewriterText}</ReactMarkdown> : typewriterText}
            </div>
        </div>
    );
};

export default ThreadItem;
