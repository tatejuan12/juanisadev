import React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from "@styles/modules/_page.module.scss";

interface ThreadItemProps {
    prompt: string;
    response: React.ReactNode;
    isError?: boolean;
    isLatest: boolean;
    typewriterText?: string;
}

const ThreadItem: React.FC<ThreadItemProps> = ({prompt, response, isError, isLatest, typewriterText}) => {
    return (
        <div className={styles.gpt_thread_item}>
            <div className={styles.gpt_thread_item_prompt}>{prompt}</div>
            <div
                className={`${styles.gpt_thread_item_response} ${isError ? styles.gpt_thread_item_response_error : ''}`}>
                {isLatest && typeof response === 'string' ? (
                    <ReactMarkdown>{typewriterText || ''}</ReactMarkdown>
                ) : (
                    typeof response === 'string' ? <ReactMarkdown>{response}</ReactMarkdown> : response
                )}
            </div>
        </div>
    );
};

export default ThreadItem;
