import { useState, useRef } from "react";

export function useMegaMenu() {
    const [activeMega, setActiveMega] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const openMega = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setActiveMega(true);
    };

    const closeMega = () => {
        timeoutRef.current = setTimeout(() => {
            setActiveMega(false);
        }, 120);
    };

    const forceClose = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setActiveMega(false);
    };

    return { activeMega, openMega, closeMega, forceClose };
}
