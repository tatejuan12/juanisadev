import {useEffect, useRef} from 'react';

const useTypewriter = (text: string, speedPerChar: number, setText: (text: string) => void) => {
    const startTimeRef = useRef<number | null>(null);

    useEffect(() => {
        if (!text) {
            setText('');
            startTimeRef.current = null;
            return;
        }

        let currentChars = 0;
        const effectiveSpeed = Math.max(0.01, speedPerChar);
        startTimeRef.current = Date.now();

        const intervalCallback = () => {
            if (startTimeRef.current === null) return;

            const elapsedTime = Date.now() - startTimeRef.current;
            const targetChars = Math.floor(elapsedTime / effectiveSpeed);
            const nextChars = Math.min(Math.max(currentChars, targetChars), text.length);

            if (nextChars > currentChars) {
                currentChars = nextChars;
                setText(text.slice(0, currentChars));
            }

            if (currentChars >= text.length) {
                clearInterval(timer);
                startTimeRef.current = null;
            }
        };

        const updateInterval = 16;
        const timer = setInterval(intervalCallback, updateInterval);

        intervalCallback();

        return () => {
            clearInterval(timer);
            startTimeRef.current = null;
        };
    }, [text, speedPerChar, setText]);
};

export default useTypewriter;
