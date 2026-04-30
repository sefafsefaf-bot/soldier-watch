export type SoldierStatus = "ok" | "warn" | "danger" | "offline";

export interface Soldier {
  id: string;
  callsign: string;
  name: string;
  rank: string;
  unit: string;
  heartRate: number;
  bodyTemp: number; // celsius
  battery: number; // %
  location: { lat: number; lng: number; label: string };
  status: SoldierStatus;
  liveCamUrl: string;
  recordingUrl: string;
}

export const soldiers: Soldier[] = [
  {
    id: "S-001",
    callsign: "FALCON",
    name: "Adam Khalil",
    rank: "Sergeant",
    unit: "Bravo-1",
    heartRate: 82,
    bodyTemp: 36.8,
    battery: 87,
    location: { lat: 31.7683, lng: 35.2137, label: "Sector 7-A" },
    status: "ok",
    liveCamUrl: "http://192.168.4.1",
    recordingUrl: "/recordings/S-001-latest.mp4",
  },
  {
    id: "S-002",
    callsign: "VIPER",
    name: "Omar Haddad",
    rank: "Corporal",
    unit: "Bravo-1",
    heartRate: 118,
    bodyTemp: 37.6,
    battery: 64,
    location: { lat: 31.7701, lng: 35.2155, label: "Sector 7-B" },
    status: "warn",
    liveCamUrl: "http://192.168.4.2",
    recordingUrl: "/recordings/S-002-latest.mp4",
  },
  {
    id: "S-003",
    callsign: "GHOST",
    name: "Layla Mansour",
    rank: "Private",
    unit: "Bravo-2",
    heartRate: 145,
    bodyTemp: 38.4,
    battery: 41,
    location: { lat: 31.7720, lng: 35.2099, label: "Sector 8-C" },
    status: "danger",
    liveCamUrl: "http://192.168.4.3",
    recordingUrl: "/recordings/S-003-latest.mp4",
  },
  {
    id: "S-004",
    callsign: "RAVEN",
    name: "Yusuf Daher",
    rank: "Sergeant",
    unit: "Bravo-2",
    heartRate: 76,
    bodyTemp: 36.6,
    battery: 92,
    location: { lat: 31.7665, lng: 35.2180, label: "Sector 6-D" },
    status: "ok",
    liveCamUrl: "http://192.168.4.4",
    recordingUrl: "/recordings/S-004-latest.mp4",
  },
  {
    id: "S-005",
    callsign: "WOLF",
    name: "Sami Nader",
    rank: "Lieutenant",
    unit: "Alpha-1",
    heartRate: 0,
    bodyTemp: 0,
    battery: 0,
    location: { lat: 0, lng: 0, label: "Signal lost" },
    status: "offline",
    liveCamUrl: "http://192.168.4.5",
    recordingUrl: "/recordings/S-005-latest.mp4",
  },
  {
    id: "S-006",
    callsign: "HAWK",
    name: "Karim Aziz",
    rank: "Corporal",
    unit: "Alpha-1",
    heartRate: 88,
    bodyTemp: 36.9,
    battery: 73,
    location: { lat: 31.7690, lng: 35.2120, label: "Sector 7-A" },
    status: "ok",
    liveCamUrl: "http://192.168.4.6",
    recordingUrl: "/recordings/S-006-latest.mp4",
  },
];

export const statusLabel: Record<SoldierStatus, string> = {
  ok: "NOMINAL",
  warn: "ELEVATED",
  danger: "CRITICAL",
  offline: "OFFLINE",
};
