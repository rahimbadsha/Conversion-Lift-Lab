import { createContext, useContext, useState, useEffect } from 'react';

const LangContext = createContext();

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('cll-lang') || 'en');

  useEffect(() => {
    localStorage.setItem('cll-lang', lang);
    document.documentElement.lang = lang === 'bn' ? 'bn' : 'en';
    document.body.classList.toggle('lang-bn', lang === 'bn');
  }, [lang]);

  const t = (en, bn) => lang === 'bn' ? bn : en;

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
