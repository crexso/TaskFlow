import { useState, type ReactNode } from 'react';
import type { Language, TranslationKeys } from '@lib/translations';
import { translations } from '@lib/translations';
import { TranslationContext, getInitialLanguage } from './TranslationContext.types';

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('taskflow_language', newLanguage);
  };

  const t = (key: TranslationKeys): string => {
    return translations[language][key] || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
}