import {useState, useEffect} from "react";

const useSessionStorage = (name: string, initialValue: string = '') => {
    const [storedValue, setStoredValue] = useState<string>(() => {
        const item = sessionStorage.getItem(name);
        return item ? JSON.parse(item) : initialValue;
    });

    const setValue = (value: string | ((val: string) => string)) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;

            setStoredValue(valueToStore);

            if (typeof window !== "undefined") {
                sessionStorage.setItem(name, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.error(`Error setting ${name} in session storage:`, error);
        }
    };

    useEffect(() => {
        // Optional: Update session storage when storedValue changes.
        if (typeof window !== "undefined") {
            sessionStorage.setItem(name, JSON.stringify(storedValue));
        }
    }, [name, storedValue]);

    return [storedValue, setValue] as const; // Use "as const" for a readonly tuple
};

export default useSessionStorage;