import { Link } from "@tanstack/react-router";
import { Heart, MapPin, User } from "lucide-react";
import type { Soldier } from "@/data/soldiers";
import { useApp } from "@/lib/app-context";

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

export function SoldierCard({ soldier }: { soldier: Soldier }) {
  const { lang, t } = useApp();
  const c = statusColor[soldier.status];
  const bg = statusBg[soldier.status];

  const name = lang === "ar" ? soldier.nameAr : soldier.name;
  const rank = lang === "ar" ? soldier.rankAr : soldier.rank;
  const locationLabel = lang === "ar" ? soldier.location.labelAr : soldier.location.label;

  const statusText: Record<string, string> = {
    ok: t.nominal,
    warn: t.elevatedStatus,
    danger: t.criticalStatus,
    offline: t.offlineStatus,
  };

  return (
    <Link
      to="/soldier/$id"
      params={{ id: soldier.id }}
      className="group relative block rounded-sm border border-border bg-card p-5 transition-all hover:border-primary hover:shadow-[0_0_30px_-8px_var(--color-primary)]"
    >
      <div className="absolute end-4 top-4 flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${bg} ${soldier.status === "ok" ? "pulse-ok" : ""}`} />
        <span className={`font-mono text-[10px] font-bold tracking-widest ${c}`}>
          {statusText[soldier.status]}
        </span>
      </div>

      <div className="flex items-start gap-4">
        <div className={`flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary bg-secondary gov-seal-bg ${c}`}>
          <User className="h-7 w-7" />
        </div>
        <div className="min-w-0">
          <div className="font-mono text-xs text-primary">{soldier.id}</div>
          <div className="truncate text-lg font-bold leading-tight text-foreground">
            {name}
          </div>
          <div className="truncate text-xs text-muted-foreground">
            {rank} · {soldier.unit}
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-4">
        <div className="flex items-center gap-2">
          <Heart className={`h-4 w-4 ${c}`} />
          <div>
            <div className="font-mono text-[10px] uppercase text-muted-foreground">{t.heartRate}</div>
            <div className="font-mono text-sm font-semibold text-foreground">
              {soldier.status === "offline" ? "--" : `${soldier.heartRate} ${t.bpm}`}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <div className="min-w-0">
            <div className="font-mono text-[10px] uppercase text-muted-foreground">{t.location}</div>
            <div className="truncate font-mono text-sm font-semibold text-foreground">
              {locationLabel}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
