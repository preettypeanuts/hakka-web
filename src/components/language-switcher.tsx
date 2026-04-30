'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTransition, useEffect } from 'react';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const currentLocale = pathname.split('/')[1] === 'en' ? 'en' : 'id';

  useEffect(() => {
    const otherLocale = currentLocale === 'id' ? 'en' : 'id';
    const segments = pathname.split('/');
    segments[1] = otherLocale;
    router.prefetch(segments.join('/') || `/${otherLocale}`);
  }, [pathname, currentLocale, router]);

  const switchLocale = (locale: 'id' | 'en') => {
    if (locale === currentLocale || isPending) return;
    const segments = pathname.split('/');
    segments[1] = locale;
    startTransition(() => {
      router.replace(segments.join('/') || `/${locale}`, {
        scroll: false
      });
    });
  };

  return (
    <div
      className={`flex items-center border border-white/30 px-1 py-0.5 backdrop-blur-sm transition-opacity duration-300 rounded-main ${isPending ? 'opacity-50 pointer-events-none' : 'opacity-100'
        }`}
    >
      {(['id', 'en'] as const).map((locale) => (
        <button
          key={locale}
          onClick={() => switchLocale(locale)}
          disabled={isPending}
          className={`px-3 py-1 text-xs font-semibold tracking-widest uppercase transition-all duration-200 rounded-secondary ${currentLocale === locale
            ? 'bg-white text-black'
            : 'text-white/70 hover:text-white'
            }`}
        >
          {locale}
        </button>
      ))}
    </div>
  );
}