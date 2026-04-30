export type SoldierStatus = "ok" | "warn" | "danger" | "offline";

export interface BloodPressure {
  systolic: number;
  diastolic: number;
}

export interface Soldier {
  id: string;
  callsign: string;
  name: string;
  nameAr: string;
  rank: string;
  rankAr: string;
  unit: string;
  heartRate: number;
  bodyTemp: number;
  bp: BloodPressure;
  battery: number;
  location: { lat: number; lng: number; label: string; labelAr: string };
  status: SoldierStatus;
  liveCamUrl: string;
  recordingUrl: string;
  liveDataUrl?: string;
}

// Replace this with the ESP32's local IP when ready (e.g. http://192.168.1.42/data).
export const ESP32_LIVE_DATA_URL = "http://192.168.4.1/data";

export const soldiers: Soldier[] = [
  {
    id: "S-001",
    callsign: "FALCON",
    name: "Wesam Al-Otaibi",
    nameAr: "وسام العتيبي",
    rank: "Sergeant",
    rankAr: "رقيب",
    unit: "Bravo-1",
    heartRate: 82,
    bodyTemp: 36.8,
    bp: { systolic: 120, diastolic: 80 },
    battery: 87,
    location: { lat: 24.7136, lng: 46.6753, label: "Sector 7-A", labelAr: "القطاع ٧-أ" },
    status: "ok",
    liveCamUrl: "http://192.168.4.1",
    recordingUrl: "/recordings/S-001-latest.mp4",
    liveDataUrl: ESP32_LIVE_DATA_URL,
  },
  {
    id: "S-002",
    callsign: "VIPER",
    name: "Abdullah Al-Qahtani",
    nameAr: "عبدالله القحطاني",
    rank: "Corporal",
    rankAr: "عريف",
    unit: "Bravo-1",
    heartRate: 118,
    bodyTemp: 37.6,
    bp: { systolic: 138, diastolic: 88 },
    battery: 64,
    location: { lat: 24.7150, lng: 46.6770, label: "Sector 7-B", labelAr: "القطاع ٧-ب" },
    status: "warn",
    liveCamUrl: "http://192.168.4.2",
    recordingUrl: "/recordings/S-002-latest.mp4",
  },
  {
    id: "S-003",
    callsign: "GHOST",
    name: "Faisal Al-Harbi",
    nameAr: "فيصل الحربي",
    rank: "Private",
    rankAr: "جندي",
    unit: "Bravo-2",
    heartRate: 145,
    bodyTemp: 38.4,
    bp: { systolic: 150, diastolic: 95 },
    battery: 41,
    location: { lat: 24.7170, lng: 46.6720, label: "Sector 8-C", labelAr: "القطاع ٨-ج" },
    status: "danger",
    liveCamUrl: "http://192.168.4.3",
    recordingUrl: "/recordings/S-003-latest.mp4",
  },
  {
    id: "S-004",
    callsign: "RAVEN",
    name: "Khalid Al-Shahrani",
    nameAr: "خالد الشهراني",
    rank: "Sergeant",
    rankAr: "رقيب",
    unit: "Bravo-2",
    heartRate: 76,
    bodyTemp: 36.6,
    bp: { systolic: 118, diastolic: 78 },
    battery: 92,
    location: { lat: 24.7110, lng: 46.6800, label: "Sector 6-D", labelAr: "القطاع ٦-د" },
    status: "ok",
    liveCamUrl: "http://192.168.4.4",
    recordingUrl: "/recordings/S-004-latest.mp4",
  },
  {
    id: "S-005",
    callsign: "WOLF",
    name: "Sultan Al-Dosari",
    nameAr: "سلطان الدوسري",
    rank: "Lieutenant",
    rankAr: "ملازم",
    unit: "Alpha-1",
    heartRate: 0,
    bodyTemp: 0,
    bp: { systolic: 0, diastolic: 0 },
    battery: 0,
    location: { lat: 0, lng: 0, label: "Signal lost", labelAr: "انقطعت الإشارة" },
    status: "offline",
    liveCamUrl: "http://192.168.4.5",
    recordingUrl: "/recordings/S-005-latest.mp4",
  },
  {
    id: "S-006",
    callsign: "HAWK",
    name: "Majed Al-Ghamdi",
    nameAr: "ماجد الغامدي",
    rank: "Corporal",
    rankAr: "عريف",
    unit: "Alpha-1",
    heartRate: 88,
    bodyTemp: 36.9,
    bp: { systolic: 122, diastolic: 79 },
    battery: 73,
    location: { lat: 24.7130, lng: 46.6740, label: "Sector 7-A", labelAr: "القطاع ٧-أ" },
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
