import { useState, useEffect } from 'react';

const useTypewriter = (text: string, delay: number = 50) => {
    const [currentText, setCurrentText] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setCurrentText((prev) => prev + text[index]);
                setIndex((prev) => prev + 1);
            }, delay);

            return () => clearTimeout(timeout);
        }
    }, [index, text, delay]);

    return currentText;
};

export default useTypewriter;
import { useEffect } from 'react';

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
