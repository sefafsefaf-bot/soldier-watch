import { createFileRoute } from "@tanstack/react-router";
import { Radio, ShieldCheck } from "lucide-react";
import { soldiers } from "@/data/soldiers";
import { SoldierCard } from "@/components/SoldierCard";
import { SettingsToggles } from "@/components/SettingsToggles";
import { useApp } from "@/lib/app-context";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  const { t } = useApp();
  const counts = soldiers.reduce(
    (acc, s) => ((acc[s.status] = (acc[s.status] ?? 0) + 1), acc),
    {} as Record<string, number>,
  );

  return (
    <div className="min-h-screen">
      <div className="border-b border-primary/40 bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-6 py-1.5 font-mono text-[10px] tracking-[0.3em]">
          <span>{t.ministry}</span>
          <span className="hidden sm:inline">{t.commandCenter}</span>
          <span>{t.topBarMotto}</span>
        </div>
      </div>
      <header className="border-b-2 border-primary/40 bg-card/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary bg-secondary text-primary gov-seal-bg">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-[0.35em] text-primary">
                {t.ministry}
              </div>
              <h1 className="text-xl font-bold uppercase tracking-wider text-foreground sm:text-2xl">
                {t.commandCenter}
              </h1>
              <div className="font-mono text-[10px] tracking-widest text-muted-foreground">
                {t.classification} · {t.appTitle}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-sm border border-primary/40 bg-secondary/60 px-3 py-1.5 sm:flex">
              <Radio className="h-3.5 w-3.5 animate-pulse text-status-ok" />
              <span className="font-mono text-[11px] tracking-widest text-muted-foreground">
                {t.secureLink}
              </span>
            </div>
            <SettingsToggles />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <section className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          <Stat label={t.active} value={counts.ok ?? 0} accent="text-status-ok" />
          <Stat label={t.elevated} value={counts.warn ?? 0} accent="text-status-warn" />
          <Stat label={t.critical} value={counts.danger ?? 0} accent="text-status-danger" />
          <Stat label={t.offline} value={counts.offline ?? 0} accent="text-status-offline" />
        </section>

        <div className="mb-4 flex items-baseline justify-between border-b border-primary/30 pb-2">
          <h2 className="font-mono text-xs tracking-[0.35em] text-primary">
            {t.deployedPersonnel} // {soldiers.length} {t.units}
          </h2>
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
            {t.rosterLive}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {soldiers.map((s) => (
            <SoldierCard key={s.id} soldier={s} />
          ))}
        </div>
      </main>

      <footer className="mx-auto max-w-7xl px-6 py-6 text-center font-mono text-[10px] tracking-widest text-muted-foreground">
        {t.endTransmission}
      </footer>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent: string }) {
  return (
    <div className="rounded-sm border border-border bg-card p-4">
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      <div className={`mt-1 font-mono text-3xl font-bold ${accent}`}>
        {String(value).padStart(2, "0")}
      </div>
    </div>
  );
}
