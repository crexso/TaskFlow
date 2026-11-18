import { useContext } from 'react';
import { TranslationContext } from '@context/TranslationContext.types';

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) throw new Error('useTranslation must be used within TranslationProvider');
  return context;
}