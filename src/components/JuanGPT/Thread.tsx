import React, { useEffect, useState } from 'react';
import styles from "@styles/modules/_page.module.scss";
import ThreadItem from './ThreadItem';
import Loading from "@components/JuanGPT/Loading";
import useTypewriter from '@components/JuanGPT/useTypewriter';

interface ThreadProps {
    thread: Array<{
        prompt: string;
        response: string;
        isError: boolean;
    }>;
    currentPrompt: string;
    isLoading: boolean;
}

const Thread: React.FC<ThreadProps> = ({thread, currentPrompt, isLoading}) => {
    const [typewriterText, setTypewriterText] = useState('');
    const latestResponse = thread[thread.length - 1]?.response || '';

    useEffect(() => {
        setTypewriterText('');
    }, [latestResponse]);

    useTypewriter(latestResponse, 1, setTypewriterText);

    return (
        <div className={styles.gpt_thread} key={thread.length}>
            {thread.map((item, index) => (
                <ThreadItem 
                    key={index} 
                    {...item} 
                    isLatest={index === thread.length - 1}
                    typewriterText={index === thread.length - 1 ? typewriterText : undefined}
                />
            ))}
            {isLoading && (
                <ThreadItem prompt={currentPrompt} response={<Loading/>} isLatest={false}/>
            )}
        </div>
    );
};

export default Thread;
