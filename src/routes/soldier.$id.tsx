import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Activity,
  ArrowLeft,
  BatteryMedium,
  Heart,
  MapPin,
  PlayCircle,
  Radio,
  Thermometer,
  Video,
  User,
  AlertTriangle,
} from "lucide-react";
import { soldiers, statusLabel } from "@/data/soldiers";
import { useLiveTelemetry } from "@/hooks/useLiveTelemetry";

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

  const live = useLiveTelemetry(soldier.liveDataUrl);
  const isLive = !!soldier.liveDataUrl && !!live.data;

  // If live data is available, override the static values
  const heartRate = isLive ? live.data!.heartRate : soldier.heartRate;
  const bodyTemp = isLive ? live.data!.bodyTemp : soldier.bodyTemp;
  const bp = isLive ? live.data!.bp : soldier.bp;

  return (
    <div className="min-h-screen">
      <header className="border-b-2 border-primary/40 bg-card/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link
            to="/"
            className="flex items-center gap-2 font-mono text-xs tracking-widest text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> RETURN TO COMMAND
          </Link>
          <div className="flex items-center gap-3">
            {soldier.liveDataUrl && (
              <div className={`flex items-center gap-1.5 rounded-sm border px-2 py-1 ${
                live.error
                  ? "border-status-danger/50 text-status-danger"
                  : isLive
                    ? "border-status-ok/50 text-status-ok"
                    : "border-border text-muted-foreground"
              }`}>
                <Radio className={`h-3 w-3 ${isLive ? "animate-pulse" : ""}`} />
                <span className="font-mono text-[10px] tracking-widest">
                  {live.error ? "LINK DOWN" : isLive ? "LIVE STREAM" : "CONNECTING…"}
                </span>
              </div>
            )}
            <span className={`h-2.5 w-2.5 rounded-full ${bg} ${soldier.status === "ok" ? "pulse-ok" : ""}`} />
            <span className={`font-mono text-xs font-bold tracking-widest ${c}`}>
              {statusLabel[soldier.status]}
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <section className="flex flex-col gap-6 border-b border-primary/30 pb-8 md:flex-row md:items-center">
          <div className={`flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-secondary gov-seal-bg ${c}`}>
            <User className="h-12 w-12" />
          </div>
          <div className="flex-1">
            <div className="font-mono text-[10px] tracking-[0.35em] text-primary">
              PERSONNEL FILE · {soldier.id} · {soldier.unit}
            </div>
            <h1 className="text-4xl font-bold uppercase tracking-wider text-foreground">
              {soldier.callsign}
            </h1>
            <div className="mt-1 text-muted-foreground">
              {soldier.rank} · {soldier.name}
            </div>
          </div>
        </section>

        {soldier.liveDataUrl && live.error && (
          <div className="mt-6 flex items-start gap-3 rounded-sm border border-status-danger/40 bg-status-danger/10 p-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-status-danger" />
            <div className="text-sm">
              <div className="font-mono text-xs font-bold tracking-widest text-status-danger">
                LIVE LINK ERROR
              </div>
              <div className="mt-1 text-muted-foreground">
                Could not reach <span className="font-mono">{soldier.liveDataUrl}</span> ({live.error}).
                Make sure the iPad is on the same Wi-Fi as the vest, and that the dashboard is opened over <span className="font-mono">http://</span> (not https).
              </div>
            </div>
          </div>
        )}

        <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Vital
            icon={<Heart className="h-5 w-5" />}
            label="Heart Rate"
            value={offline ? "--" : `${heartRate}`}
            unit="bpm"
            accent={c}
            live={isLive}
          />
          <Vital
            icon={<Thermometer className="h-5 w-5" />}
            label="Body Temp"
            value={offline ? "--" : bodyTemp.toFixed(1)}
            unit="°C"
            accent={c}
            live={isLive}
          />
          <Vital
            icon={<Activity className="h-5 w-5" />}
            label="Blood Pressure"
            value={offline ? "--" : `${bp.systolic}/${bp.diastolic}`}
            unit="mmHg"
            accent={c}
            live={isLive}
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
        </section>

        <section className="mt-4">
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
            className="group relative overflow-hidden rounded-sm border-2 border-primary/50 bg-gradient-to-br from-primary/15 to-transparent p-6 transition hover:border-primary"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-primary text-primary-foreground">
                <Video className="h-6 w-6" />
              </div>
              <div>
                <div className="font-mono text-[10px] tracking-widest text-primary">
                  ESP32-CAM
                </div>
                <div className="text-lg font-bold uppercase tracking-wider text-foreground">Live Feed</div>
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
            className="group relative overflow-hidden rounded-sm border border-border bg-card p-6 transition hover:border-primary/60"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-sm border border-border bg-secondary text-foreground">
                <PlayCircle className="h-6 w-6" />
              </div>
              <div>
                <div className="font-mono text-[10px] tracking-widest text-muted-foreground">
                  PLAYBACK
                </div>
                <div className="text-lg font-bold uppercase tracking-wider text-foreground">Last 10 min</div>
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
  live,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit: string;
  accent: string;
  small?: boolean;
  live?: boolean;
}) {
  return (
    <div className="relative rounded-sm border border-border bg-card p-5">
      {live && (
        <span className="absolute right-3 top-3 flex items-center gap-1 font-mono text-[9px] tracking-widest text-status-ok">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-status-ok" />
          LIVE
        </span>
      )}
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
