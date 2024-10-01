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
