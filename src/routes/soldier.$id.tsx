import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  BatteryMedium,
  Heart,
  MapPin,
  PlayCircle,
  Thermometer,
  Video,
  User,
} from "lucide-react";
import { soldiers, statusLabel } from "@/data/soldiers";

export const Route = createFileRoute("/soldier/$id")({
  loader: ({ params }) => {
    const soldier = soldiers.find((s) => s.id === params.id);
    if (!soldier) throw notFound();
    return { soldier };
  },
  component: SoldierDetail,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="font-mono text-3xl text-foreground">SOLDIER NOT FOUND</h1>
        <Link to="/" className="mt-4 inline-block text-primary underline">
          Back to dashboard
        </Link>
      </div>
    </div>
  ),
});

const statusColor: Record<string, string> = {
  ok: "text-status-ok",
  warn: "text-status-warn",
  danger: "text-status-danger",
  offline: "text-status-offline",
};
const statusBg: Record<string, string> = {
  ok: "bg-status-ok",
  warn: "bg-status-warn",
  danger: "bg-status-danger",
  offline: "bg-status-offline",
};

function SoldierDetail() {
  const { soldier } = Route.useLoaderData();
  const c = statusColor[soldier.status];
  const bg = statusBg[soldier.status];
  const offline = soldier.status === "offline";

  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-card/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link
            to="/"
            className="flex items-center gap-2 font-mono text-xs tracking-wider text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> BACK TO COMMAND
          </Link>
          <div className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${bg} ${soldier.status === "ok" ? "pulse-ok" : ""}`} />
            <span className={`font-mono text-xs font-bold tracking-widest ${c}`}>
              {statusLabel[soldier.status]}
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <section className="flex flex-col gap-6 border-b border-border pb-8 md:flex-row md:items-center">
          <div className={`flex h-24 w-24 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary ${c}`}>
            <User className="h-12 w-12" />
          </div>
          <div className="flex-1">
            <div className="font-mono text-xs tracking-widest text-muted-foreground">
              {soldier.id} · {soldier.unit}
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              {soldier.callsign}
            </h1>
            <div className="mt-1 text-muted-foreground">
              {soldier.rank} · {soldier.name}
            </div>
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Vital
            icon={<Heart className="h-5 w-5" />}
            label="Heart Rate"
            value={offline ? "--" : `${soldier.heartRate}`}
            unit="bpm"
            accent={c}
          />
          <Vital
            icon={<Thermometer className="h-5 w-5" />}
            label="Body Temp"
            value={offline ? "--" : soldier.bodyTemp.toFixed(1)}
            unit="°C"
            accent={c}
          />
          <Vital
            icon={<BatteryMedium className="h-5 w-5" />}
            label="Vest Battery"
            value={offline ? "--" : `${soldier.battery}`}
            unit="%"
            accent={
              soldier.battery > 60
                ? "text-status-ok"
                : soldier.battery > 30
                  ? "text-status-warn"
                  : "text-status-danger"
            }
          />
          <Vital
            icon={<MapPin className="h-5 w-5" />}
            label="Location"
            value={soldier.location.label}
            unit={offline ? "" : `${soldier.location.lat.toFixed(4)}, ${soldier.location.lng.toFixed(4)}`}
            accent="text-foreground"
            small
          />
        </section>

        <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <a
            href={soldier.liveCamUrl}
            target="_blank"
            rel="noreferrer"
            className="group relative overflow-hidden rounded-lg border border-primary/40 bg-gradient-to-br from-primary/20 to-transparent p-6 transition hover:border-primary"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Video className="h-6 w-6" />
              </div>
              <div>
                <div className="font-mono text-[10px] tracking-widest text-primary">
                  ESP32-CAM
                </div>
                <div className="text-lg font-bold text-foreground">Live Feed</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Open the on-vest camera stream in a new window.
            </p>
            <div className="mt-3 font-mono text-xs text-muted-foreground">
              {soldier.liveCamUrl}
            </div>
          </a>

          <a
            href={soldier.recordingUrl}
            target="_blank"
            rel="noreferrer"
            className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition hover:border-foreground/40"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-md border border-border bg-secondary text-foreground">
                <PlayCircle className="h-6 w-6" />
              </div>
              <div>
                <div className="font-mono text-[10px] tracking-widest text-muted-foreground">
                  PLAYBACK
                </div>
                <div className="text-lg font-bold text-foreground">Last 10 min</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Replay the most recent recorded buffer from the vest.
            </p>
          </a>
        </section>
      </main>
    </div>
  );
}

function Vital({
  icon,
  label,
  value,
  unit,
  accent,
  small,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit: string;
  accent: string;
  small?: boolean;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-center gap-2 text-muted-foreground">
        <span className={accent}>{icon}</span>
        <span className="font-mono text-[10px] uppercase tracking-widest">{label}</span>
      </div>
      <div className={`mt-3 font-mono font-bold ${accent} ${small ? "text-lg" : "text-3xl"}`}>
        {value}
      </div>
      {unit && (
        <div className="mt-1 font-mono text-xs text-muted-foreground">{unit}</div>
      )}
    </div>
  );
}
