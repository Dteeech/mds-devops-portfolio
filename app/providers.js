'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { FaroProvider } from './faro-provider';

export function ThemeProvider({ children, ...props }) {
  return (
    <FaroProvider>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </FaroProvider>
  );
}
