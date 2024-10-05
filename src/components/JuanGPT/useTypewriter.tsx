import {useEffect} from 'react';

const useTypewriter = (text: string, speed: number, setText: (text: string) => void) => {
    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                setText(text.slice(0, i + 1));
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);

        return () => clearInterval(timer);
    }, [text, speed, setText]);
};

export default useTypewriter;
