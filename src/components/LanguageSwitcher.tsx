import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { SUPPORTED_LANGS, type Lang } from '../i18n';

interface LangMeta {
  code: Lang;
  label: string;
  short: string;
}

const LANGS: LangMeta[] = [
  { code: 'en', label: 'English',   short: 'EN' },
  { code: 'fr', label: 'Français',  short: 'FR' },
  { code: 'ar', label: 'العربية',   short: 'AR' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen]       = useState(false);
  const [pending, setPending] = useState<Lang | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGS.find((l) => l.code === i18n.language) ?? LANGS[0];

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onEsc);
    };
  }, []);

  const change = (code: Lang) => {
    if (code === i18n.language) { setOpen(false); return; }
    setPending(code);
    setOpen(false);
    window.setTimeout(() => {
      i18n.changeLanguage(code);
      setPending(null);
    }, 220);
  };

  return (
    <div ref={ref} className="relative">
      {/* trigger button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change language"
        className={`
          group flex items-center gap-1.5 rounded-full
          border px-3 py-2 text-xs font-semibold uppercase tracking-wider
          backdrop-blur-md transition-all duration-200
          ${open
            ? 'border-electric-500/50 bg-electric-500/10 text-electric-200 shadow-[0_0_16px_-4px_rgba(99,102,241,0.35)]'
            : 'border-white/10 bg-white/[0.04] text-ink-100 hover:border-white/20 hover:bg-white/[0.07] hover:text-white'
          }
        `}
      >
        <Globe
          size={13}
          className={`shrink-0 transition-colors ${open ? 'text-electric-300' : 'text-ink-300 group-hover:text-ink-100'}`}
          strokeWidth={2}
        />
        <span className="min-w-[1.75rem] text-center leading-none">{current.short}</span>
        <ChevronDown
          size={11}
          className={`shrink-0 text-ink-400 transition-all duration-300 ${open ? 'rotate-180 text-electric-400' : 'group-hover:text-ink-200'}`}
          strokeWidth={2.5}
        />
      </button>

      {/* dropdown */}
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute end-0 z-50 mt-2.5 w-44 overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-900/90 p-1.5 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.7)] backdrop-blur-2xl"
          >
            {LANGS.map((l) => {
              const active = l.code === current.code;
              return (
                <li key={l.code}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => change(l.code)}
                    className={`
                      group/item flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5
                      text-sm font-medium transition-all duration-150
                      ${active
                        ? 'bg-electric-500/[0.14] text-electric-200'
                        : 'text-ink-200 hover:bg-white/[0.05] hover:text-white'
                      }
                    `}
                  >
                    <span className="flex-1 text-start leading-snug">{l.label}</span>
                    {active
                      ? <Check size={13} className="shrink-0 text-electric-400" strokeWidth={2.5} />
                      : <span className="h-3.5 w-3.5 shrink-0" />
                    }
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>

      {/* page-transition overlay when language is switching */}
      <AnimatePresence>
        {pending && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="pointer-events-none fixed inset-0 z-[60] bg-ink-950/20 backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>
    </div>
  );
}


