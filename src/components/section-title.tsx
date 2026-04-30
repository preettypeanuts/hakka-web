type SectionTitleProps = {
    children: React.ReactNode;
    variant?: "primary" | "accent" | "muted";
    className?: string;
};

export const SectionTitle = ({
    children,
    variant = "primary",
    className = ""
}: SectionTitleProps) => {
    const variantStyles = {
        primary: "text-mainColor",
        accent: "text-primary",
        muted: "text-neutral-700"
    };

    return (
        <div className="mb-10 relative">
            <h2
                className={`
          text-2xl md:text-3xl font-semibold uppercase
          tracking-[0.2em]
          ${variantStyles[variant]}
          ${className}
        `}
            >
                {children}
            </h2>

            {/* decorative line */}
            <div
                className={`
                            h-2 w-16 absolute bottom-1 left-0 -z-10
                        ${variant === "accent" ? "bg-primary" : "bg-otherColor"}
        `}
            />
        </div>
    );
};