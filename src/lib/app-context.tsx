import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { translations, type Lang, type TranslationStrings } from "./i18n";

type Theme = "light" | "dark";

interface AppContextValue {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  t: TranslationStrings;
  dir: "ltr" | "rtl";
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [lang, setLangState] = useState<Lang>("en");

  // Hydrate from localStorage on mount (client-only)
  useEffect(() => {
    const savedTheme = (typeof window !== "undefined" && localStorage.getItem("theme")) as Theme | null;
    const savedLang = (typeof window !== "undefined" && localStorage.getItem("lang")) as Lang | null;
    if (savedTheme === "light" || savedTheme === "dark") setThemeState(savedTheme);
    if (savedLang === "en" || savedLang === "ar") setLangState(savedLang);
  }, []);

  // Apply theme to <html>
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Apply lang/dir to <html>
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    localStorage.setItem("lang", lang);
  }, [lang]);

  const value: AppContextValue = {
    theme,
    setTheme: setThemeState,
    toggleTheme: () => setThemeState((t) => (t === "dark" ? "light" : "dark")),
    lang,
    setLang: setLangState,
    toggleLang: () => setLangState((l) => (l === "en" ? "ar" : "en")),
    t: translations[lang],
    dir: lang === "ar" ? "rtl" : "ltr",
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
