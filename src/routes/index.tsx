import { createFileRoute } from "@tanstack/react-router";
import { Radio, Shield } from "lucide-react";
import { soldiers } from "@/data/soldiers";
import { SoldierCard } from "@/components/SoldierCard";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  const counts = soldiers.reduce(
    (acc, s) => ((acc[s.status] = (acc[s.status] ?? 0) + 1), acc),
    {} as Record<string, number>,
  );

  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-card/60 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
                COMMAND DASHBOARD
              </div>
              <h1 className="text-xl font-bold tracking-tight text-foreground">
                SENTINEL <span className="text-primary">·</span> Vest Telemetry
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-md border border-border bg-secondary/50 px-3 py-1.5">
            <Radio className="h-3.5 w-3.5 animate-pulse text-status-ok" />
            <span className="font-mono text-[11px] tracking-wider text-muted-foreground">
              LIVE FEED
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <section className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">
          <Stat label="Active" value={counts.ok ?? 0} accent="text-status-ok" />
          <Stat label="Elevated" value={counts.warn ?? 0} accent="text-status-warn" />
          <Stat label="Critical" value={counts.danger ?? 0} accent="text-status-danger" />
          <Stat label="Offline" value={counts.offline ?? 0} accent="text-status-offline" />
        </section>

        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="font-mono text-xs tracking-[0.3em] text-muted-foreground">
            DEPLOYED PERSONNEL // {soldiers.length}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {soldiers.map((s) => (
            <SoldierCard key={s.id} soldier={s} />
          ))}
        </div>
      </main>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      <div className={`mt-1 font-mono text-3xl font-bold ${accent}`}>
        {String(value).padStart(2, "0")}
      </div>
    </div>
  );
}
