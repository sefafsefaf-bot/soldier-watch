import { useEffect, useState } from "react";
import type { BloodPressure } from "@/data/soldiers";

export interface LiveTelemetry {
  heartRate: number;
  bodyTemp: number;
  bp: BloodPressure;
  sos: boolean;
  rawStatus?: string;
}

export interface LiveTelemetryState {
  data: LiveTelemetry | null;
  error: string | null;
  loading: boolean;
  lastUpdated: Date | null;
}

/**
 * Polls the ESP32 endpoint directly from the browser.
 * Returns null data when no URL is provided (uses static values from soldiers.ts).
 *
 * NOTE: Browsers block http:// fetches from https:// pages. On the iPad, open
 * the dashboard via http:// (same Wi-Fi as the ESP32) or the request will fail.
 */
export function useLiveTelemetry(url: string | undefined, intervalMs = 2000): LiveTelemetryState {
  const [state, setState] = useState<LiveTelemetryState>({
    data: null,
    error: null,
    loading: !!url,
    lastUpdated: null,
  });

  useEffect(() => {
    if (!url) return;

    let cancelled = false;

    const fetchOnce = async () => {
      try {
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as Partial<LiveTelemetry>;
        if (cancelled) return;
        setState({
          data: {
            heartRate: Number(json.heartRate ?? 0),
            bodyTemp: Number(json.bodyTemp ?? 0),
            bp: {
              systolic: Number(json.bp?.systolic ?? 0),
              diastolic: Number(json.bp?.diastolic ?? 0),
            },
          },
          error: null,
          loading: false,
          lastUpdated: new Date(),
        });
      } catch (e) {
        if (cancelled) return;
        setState((s) => ({
          ...s,
          error: e instanceof Error ? e.message : "Connection failed",
          loading: false,
        }));
      }
    };

    fetchOnce();
    const id = setInterval(fetchOnce, intervalMs);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [url, intervalMs]);

  return state;
}
