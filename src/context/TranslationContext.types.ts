import { createContext } from 'react';
import type { Language, TranslationKeys } from '@lib/translations';

const STORAGE_KEY = 'taskflow_language';

export const getInitialLanguage = (): Language => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'ru' || saved === 'en') return saved;
  }
  return 'ru';
};

export interface TranslationContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKeys) => string;
}

export const TranslationContext = createContext<TranslationContextValue | null>(null);