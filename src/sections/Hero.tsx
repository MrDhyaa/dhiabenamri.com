import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  Github,
  Linkedin,
  Instagram,
  Facebook,
  Twitter,
  ArrowUpRight,
  Mail,
  Palette,
  Code2,
  Rocket,
} from 'lucide-react';
import MagneticButton from '../components/MagneticButton';

const socials = [
  { Icon: Github, href: 'https://github.com', label: 'GitHub' },
  { Icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { Icon: Twitter, href: 'https://x.com/MrDhyaa', label: 'X / Twitter' },
  { Icon: Instagram, href: 'https://instagram.com/benlamri_91', label: 'Instagram' },
  { Icon: Facebook, href: 'https://facebook.com/MrDhyaa', label: 'Facebook' },
];

const professions = [
  { Icon: Palette, key: 'profession1' },
  { Icon: Code2, key: 'profession2' },
  { Icon: Rocket, key: 'profession3' },
];

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-20"
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-electric-600/15 blur-[140px]" />
        <div className="absolute right-1/4 top-1/2 h-72 w-72 rounded-full bg-cyan-400/8 blur-[120px]" />
      </div>

      <div className="container-narrow section-pad flex flex-col items-center text-center">
        {/* floating profile picture */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* soft glow ring */}
          <div className="absolute -inset-4 rounded-full bg-electric-500/20 blur-2xl animate-pulse-glow" />
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative rounded-full border-4 border-ink-950 bg-ink-800 p-1 shadow-soft-lg"
          >
            <div className="h-28 w-28 overflow-hidden rounded-full bg-gradient-to-br from-electric-500 to-electric-800 sm:h-32 sm:w-32">
              <img
                src="/images/image.png"
                alt="MrDYAN"
                loading="eager"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* name — one line on mobile */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-6 whitespace-nowrap font-display text-[clamp(2.5rem,9vw,5.5rem)] font-extrabold leading-none tracking-tight"
        >
          <span className="gradient-text">MrDYAN</span>
        </motion.h1>

        {/* roles — icon-prefixed, translated, separators kept */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-xs font-medium uppercase tracking-[0.2em] text-ink-200 sm:text-sm"
        >
          {professions.map((p, i) => (
            <span key={p.key} className="flex items-center gap-3">
              <span className="flex items-center gap-2">
                <p.Icon size={14} className="text-electric-300" strokeWidth={2} />
                {t(`hero.${p.key}`)}
              </span>
              {i < professions.length - 1 && (
                <span className="text-ink-500" aria-hidden="true">
                  ·
                </span>
              )}
            </span>
          ))}
        </motion.div>

        {/* bio */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mt-5 max-w-xl text-balance text-base leading-relaxed text-ink-200 sm:text-lg"
        >
          {t('hero.bio')}
        </motion.p>

        {/* social icons — single row, circular glass */}
        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mt-7 flex flex-wrap items-center justify-center gap-3"
        >
          {socials.map((s) => (
            <li key={s.label}>
              <motion.a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
whileHover={{
    scale: 1.15,
    rotate: 8,
    y: -4,
}}
                whileTap={{ scale: 0.95 }}
                className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-ink-200 backdrop-blur-md transition-all hover:border-electric-500/40 hover:bg-electric-500/10 hover:text-electric-300 hover:shadow-glow-sm"
              >
                <s.Icon size={18} strokeWidth={1.75} />
              </motion.a>
            </li>
          ))}
        </motion.ul>

        {/* CTAs — magnetic primary */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticButton to="/contact" variant="primary">
            <Mail size={16} /> {t('hero.cta')}
          </MagneticButton>
          <MagneticButton to="/portfolio" variant="ghost">
            {t('hero.ctaSecondary')} <ArrowUpRight size={16} />
          </MagneticButton>
        </motion.div>

        {/* scroll hint — elegant floating mouse with soft glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="scroll-indicator mt-10 flex flex-col items-center gap-3"
        >
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-electric-500/20 blur-xl animate-pulse-glow" />
            <div className="scroll-indicator__mouse relative flex h-8 w-5 items-start justify-center rounded-full border-2 border-ink-300/60 bg-white/[0.02] backdrop-blur-sm" />
          </div>
          <Link
            to="/about"
            className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink-400 transition-colors hover:text-ink-200"
          >
            {t('hero.scrollText')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
