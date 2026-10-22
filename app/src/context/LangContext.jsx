import { createContext, useContext, useState, useEffect } from 'react';
import { readStored, writeStored } from '../lib/storage';

const LangContext = createContext();

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => readStored('cll-lang', 'en'));

  useEffect(() => {
    writeStored('cll-lang', lang);
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

// eslint-disable-next-line react-refresh/only-export-components
export const useLang = () => useContext(LangContext);
