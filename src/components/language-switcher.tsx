'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTransition, useEffect, useState } from 'react';

const FlagID = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 15" className="w-5 h-auto rounded-xs shadow-mainShadow border border-neutral-100/10">
        <rect width="20" height="7.5" fill="#CE1126" />
        <rect y="7.5" width="20" height="7.5" fill="#FFFFFF" />
    </svg>
);

const FlagEN = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="w-5 h-auto rounded-xs shadow-mainShadow border border-neutral-100/10">
        <clipPath id="a"><path d="M0 0v30h60V0z" /></clipPath>
        <clipPath id="b"><path d="M30 15h30v15zv15H0zH0V0zV0h30z" /></clipPath>
        <g clipPath="url(#a)">
            <path d="M0 0v30h60V0z" fill="#012169" />
            <path d="M0 0l60 30m0-30L0 30" stroke="#fff" strokeWidth="6" />
            <path d="M0 0l60 30m0-30L0 30" clipPath="url(#b)" stroke="#C8102E" strokeWidth="4" />
            <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
            <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
        </g>
    </svg>
);

const FLAGS = {
    id: FlagID,
    en: FlagEN,
};

const LOCALES = [
    { code: 'id', label: 'Indonesia' },
    { code: 'en', label: 'English' },
] as const;

type Locale = 'id' | 'en';

export default function LanguageSwitcher() {
    const pathname = usePathname();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [isOpen, setIsOpen] = useState(false);

    const currentLocale = pathname.split('/')[1] === 'en' ? 'en' : 'id';
    const current = LOCALES.find(l => l.code === currentLocale)!;
    const CurrentFlag = FLAGS[currentLocale];

    useEffect(() => {
        LOCALES.forEach(({ code }) => {
            if (code === currentLocale) return;
            const segments = pathname.split('/');
            segments[1] = code;
            router.prefetch(segments.join('/') || `/${code}`);
        });
    }, [pathname, currentLocale, router]);

    const switchLocale = (locale: Locale) => {
        if (locale === currentLocale || isPending) return;
        const segments = pathname.split('/');
        segments[1] = locale;
        startTransition(() => {
            router.replace(segments.join('/') || `/${locale}`, { scroll: false });
        });
        setIsOpen(false);
    };

    return (
        <div
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            {/* Trigger */}
            <button
                className={`flex items-center gap-2 border border-white/30 px-3 py-1.5 rounded-main backdrop-blur-sm transition-opacity duration-200 ${isPending ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
            >
                <CurrentFlag />
                <span className="text-xs font-semibold tracking-widest uppercase text-white">
                    {current.code}
                </span>
                <svg
                    className={`w-3 h-3 text-white/70 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown */}
            <div className={`absolute top-full right-0 mt-2 w-40`}>
                <div className={`rounded-xl border border-neutral-200 bg-white shadow-lg overflow-hidden transition-all duration-200 ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'}`}>
                {LOCALES.map(({ code, label }) => {
                    const Flag = FLAGS[code];
                    return (
                        <button
                            key={code}
                            onClick={() => switchLocale(code)}
                            disabled={isPending}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-150 ${currentLocale === code
                                ? 'bg-neutral-50 text-neutral-900 font-semibold'
                                : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                                }`}
                        >
                            <Flag />
                            <span>{label}</span>
                            {currentLocale === code && (
                                <span className="ml-auto text-mainColor text-xs">✓</span>
                            )}
                        </button>
                    );
                })}
                </div>
            </div>
        </div>
    );
}