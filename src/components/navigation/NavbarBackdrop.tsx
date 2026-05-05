"use client";

interface NavbarBackdropProps {
    visible: boolean;
    onClick: () => void;
}

export const NavbarBackdrop = ({ visible, onClick }: NavbarBackdropProps) => {
    if (!visible) return null;

    return (
        <div
            onClick={onClick}
            className="fixed inset-0 bg-black/20 backdrop-blur-xs z-30"
        />
    );
};
