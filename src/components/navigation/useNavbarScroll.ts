import { useEffect, useState } from "react";

export function useNavbarScroll(activeMega: boolean) {
    const [visible, setVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (activeMega) return;

            const currentScrollPos = window.pageYOffset;
            setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 100);
            setPrevScrollPos(currentScrollPos);
            setIsScrolled(currentScrollPos > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [prevScrollPos, activeMega]);

    return { visible, isScrolled };
}
