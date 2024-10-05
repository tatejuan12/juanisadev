import React from 'react';
import ReactMarkdown from 'react-markdown';
import useTypewriter from '@components/JuanGPT/useTypewriter';
import styles from "@styles/modules/_page.module.scss";

interface ThreadItemProps {
    prompt: string;
    response: React.ReactNode;
    isError?: boolean;
}

const ThreadItem: React.FC<ThreadItemProps> = ({prompt, response, isError}) => {
    const typewriterText = useTypewriter(typeof response === 'string' ? response : '', 1);
    return (
        <div className={styles.gpt_thread_item}>
            <div className={styles.gpt_thread_item_prompt}>{prompt}</div>
            <div
                className={`${styles.gpt_thread_item_response} ${isError ? styles.gpt_thread_item_response_error : ''}`}>
                {typeof response === 'string' ? (
                    <ReactMarkdown>{typewriterText}</ReactMarkdown>
                ) : (
                    response
                )}
            </div>
        </div>
    );
};

export default ThreadItem;