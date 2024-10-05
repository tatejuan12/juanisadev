import React from 'react';
import styles from "@styles/modules/_page.module.scss";
import ThreadItem from './ThreadItem';
import Loading from "@components/JuanGPT/Loading";

interface ThreadProps {
    thread: Array<{
        prompt: string;
        response: string;
        isError: boolean;
    }>;
    currentPrompt: string;
    isLoading: boolean;
}

const Thread: React.FC<ThreadProps> = ({thread, currentPrompt, isLoading}) => (
    <div className={styles.gpt_thread} key={thread.length}>
        {thread.map((item, index) => (
            <ThreadItem key={index} {...item} />
        ))}
        {isLoading && (
            <ThreadItem prompt={currentPrompt} response={<Loading/>}/>
        )}
    </div>
);

export default Thread;