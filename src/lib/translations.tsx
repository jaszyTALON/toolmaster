'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type TranslationContextType = {
  language: string;
  translations: any;
  setLanguage: (lang: string) => void;
};

const TranslationContext = createContext<TranslationContextType>({
  language: 'en',
  translations: {},
  setLanguage: () => {},
});

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState('en');
  const [translations, setTranslations] = useState<any>({});

  useEffect(() => {
    // Load language from localStorage
    const savedLang = localStorage.getItem('toolmaster-language') || 'en';
    setLanguageState(savedLang);
    loadTranslations(savedLang);
  }, []);

  const loadTranslations = async (lang: string) => {
    try {
      const response = await fetch(`/locales/${lang}.json`);
      if (response.ok) {
        const data = await response.json();
        setTranslations(data);
      } else {
        // Fallback to English if language not found
        const fallback = await fetch('/locales/en.json');
        const data = await fallback.json();
        setTranslations(data);
      }
    } catch (error) {
      console.error('Error loading translations:', error);
    }
  };

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem('toolmaster-language', lang);
    loadTranslations(lang);
  };

  return (
    <TranslationContext.Provider value={{ language, translations, setLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within TranslationProvider');
  }

  const t = (key: string, defaultValue?: string): string => {
    const keys = key.split('.');
    let value = context.translations;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return defaultValue || key;
      }
    }

    return typeof value === 'string' ? value : defaultValue || key;
  };

  return {
    t,
    language: context.language,
    setLanguage: context.setLanguage,
  };
}
