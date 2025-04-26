
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import enTranslations from "../locales/en";
import ruTranslations from "../locales/ru";
import kzTranslations from "../locales/kz";

type Language = "en" | "ru" | "kz";

interface Translations {
  [key: string]: string;
}

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  languages: { code: Language; name: string }[];
}

const translations: Record<Language, Translations> = {
  en: enTranslations,
  ru: ruTranslations,
  kz: kzTranslations,
};

const languages = [
  { code: "en" as Language, name: "English" },
  { code: "ru" as Language, name: "Русский" },
  { code: "kz" as Language, name: "Қазақша" },
];

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem("language") as Language;
    return savedLang || "en";
  });

  useEffect(() => {
    // Save language preference
    localStorage.setItem("language", language);
    // Update document language
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, languages }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
