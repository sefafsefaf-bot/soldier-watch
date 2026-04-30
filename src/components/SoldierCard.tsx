import { Link } from "@tanstack/react-router";
import { Heart, MapPin, User } from "lucide-react";
import type { Soldier } from "@/data/soldiers";
import { statusLabel } from "@/data/soldiers";

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
  const c = statusColor[soldier.status];
  const bg = statusBg[soldier.status];
  return (
    <Link
      to="/soldier/$id"
      params={{ id: soldier.id }}
      className="group relative block rounded-lg border border-border bg-card p-5 transition-all hover:border-primary hover:shadow-[0_0_30px_-8px_var(--color-primary)]"
    >
      <div className="absolute right-4 top-4 flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${bg} ${soldier.status === "ok" ? "pulse-ok" : ""}`} />
        <span className={`font-mono text-[10px] font-bold tracking-widest ${c}`}>
          {statusLabel[soldier.status]}
        </span>
      </div>

      <div className="flex items-start gap-4">
        <div className={`flex h-14 w-14 items-center justify-center rounded-md border border-border bg-secondary ${c}`}>
          <User className="h-7 w-7" />
        </div>
        <div className="min-w-0">
          <div className="font-mono text-xs text-muted-foreground">{soldier.id}</div>
          <div className="truncate text-lg font-bold leading-tight text-foreground">
            {soldier.callsign}
          </div>
          <div className="truncate text-xs text-muted-foreground">
            {soldier.rank} · {soldier.name}
          </div>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-4">
        <div className="flex items-center gap-2">
          <Heart className={`h-4 w-4 ${c}`} />
          <div>
            <div className="font-mono text-[10px] uppercase text-muted-foreground">HR</div>
            <div className="font-mono text-sm font-semibold text-foreground">
              {soldier.status === "offline" ? "--" : `${soldier.heartRate} bpm`}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <div className="min-w-0">
            <div className="font-mono text-[10px] uppercase text-muted-foreground">GPS</div>
            <div className="truncate font-mono text-sm font-semibold text-foreground">
              {soldier.location.label}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
