'use client';

import * as React from 'react';
import { MoonIcon, SunIcon } from '@phosphor-icons/react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10" />; // Placeholder to avoid hydration mismatch
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 transition-colors"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? (
        <MoonIcon className="w-5 h-5" weight="fill" />
      ) : (
        <SunIcon className="w-5 h-5" weight="fill" />
      )}
    </motion.button>
  );
}
