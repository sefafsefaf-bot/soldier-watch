import { Languages, Moon, Sun } from "lucide-react";
import { useApp } from "@/lib/app-context";

export function SettingsToggles() {
  const { theme, toggleTheme, lang, toggleLang } = useApp();
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={toggleLang}
        className="flex items-center gap-1.5 rounded-sm border border-border bg-secondary/60 px-2.5 py-1.5 font-mono text-[11px] tracking-widest text-foreground transition hover:border-primary hover:text-primary"
        aria-label="Toggle language"
      >
        <Languages className="h-3.5 w-3.5" />
        {lang === "en" ? "AR" : "EN"}
      </button>
      <button
        type="button"
        onClick={toggleTheme}
        className="flex h-8 w-8 items-center justify-center rounded-sm border border-border bg-secondary/60 text-foreground transition hover:border-primary hover:text-primary"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}
