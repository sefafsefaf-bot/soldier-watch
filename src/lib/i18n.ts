export type Lang = "en" | "ar";

export interface TranslationStrings {
  ministry: string;
  appTitle: string;
  appSubtitle: string;
  classification: string;
  secureLink: string;
  active: string;
  elevated: string;
  critical: string;
  offline: string;
  deployedPersonnel: string;
  units: string;
  rosterLive: string;
  endTransmission: string;
  returnToCommand: string;
  personnelFile: string;
  heartRate: string;
  bodyTemp: string;
  bloodPressure: string;
  vestBattery: string;
  location: string;
  liveFeed: string;
  liveFeedDesc: string;
  playback: string;
  last10: string;
  playbackDesc: string;
  liveStream: string;
  connecting: string;
  linkDown: string;
  liveLinkError: string;
  liveLinkErrorDesc: (url: string, err: string) => string;
  nominal: string;
  elevatedStatus: string;
  criticalStatus: string;
  offlineStatus: string;
  soldierNotFound: string;
  backToDashboard: string;
  bpm: string;
  mmHg: string;
  sectorOnline: string;
  signalLost: string;
  sosTitle: string;
  sosBanner: string;
  sosDesc: string;
  sosBadge: string;
}

export const translations: Record<Lang, TranslationStrings> = {
  en: {
    ministry: "MINISTRY OF DEFENSE · OFFICIAL USE",
    appTitle: "SENTINEL",
    appSubtitle: "Vest Telemetry Command",
    classification: "CLASSIFICATION: RESTRICTED · CLEARANCE LEVEL III",
    secureLink: "SECURE LINK · LIVE",
    active: "Active",
    elevated: "Elevated",
    critical: "Critical",
    offline: "Offline",
    deployedPersonnel: "DEPLOYED PERSONNEL",
    units: "UNITS",
    rosterLive: "ROSTER · LIVE",
    endTransmission: "— END OF TRANSMISSION — AUTHORIZED PERSONNEL ONLY —",
    returnToCommand: "RETURN TO COMMAND",
    personnelFile: "PERSONNEL FILE",
    heartRate: "Heart Rate",
    bodyTemp: "Body Temp",
    bloodPressure: "Blood Pressure",
    vestBattery: "Vest Battery",
    location: "Location",
    liveFeed: "Live Feed",
    liveFeedDesc: "Open the on-vest camera stream in a new window.",
    playback: "PLAYBACK",
    last10: "Last 10 min",
    playbackDesc: "Replay the most recent recorded buffer from the vest.",
    liveStream: "LIVE STREAM",
    connecting: "CONNECTING…",
    linkDown: "LINK DOWN",
    liveLinkError: "LIVE LINK ERROR",
    liveLinkErrorDesc: (url: string, err: string) =>
      `Could not reach ${url} (${err}). Make sure the iPad is on the same Wi-Fi as the vest, and that the dashboard is opened over http:// (not https).`,
    nominal: "NOMINAL",
    elevatedStatus: "ELEVATED",
    criticalStatus: "CRITICAL",
    offlineStatus: "OFFLINE",
    soldierNotFound: "SOLDIER NOT FOUND",
    backToDashboard: "Back to dashboard",
    bpm: "bpm",
    mmHg: "mmHg",
    sectorOnline: "On-duty",
    signalLost: "Signal lost",
    sosTitle: "SOS · HELP REQUESTED",
    sosBanner: "SOLDIER ACTIVATED SOS",
    sosDesc: "Vest SOS button pressed. Immediate response required.",
    sosBadge: "SOS",
  },
  ar: {
    ministry: "وزارة الدفاع · للاستخدام الرسمي",
    appTitle: "سنتينل",
    appSubtitle: "قيادة قياس السترة",
    classification: "التصنيف: مقيد · مستوى التصريح الثالث",
    secureLink: "اتصال آمن · مباشر",
    active: "نشط",
    elevated: "مرتفع",
    critical: "حرج",
    offline: "غير متصل",
    deployedPersonnel: "الأفراد الميدانيون",
    units: "وحدة",
    rosterLive: "السجل · مباشر",
    endTransmission: "— نهاية البث — للأفراد المخولين فقط —",
    returnToCommand: "العودة إلى القيادة",
    personnelFile: "ملف الفرد",
    heartRate: "معدل النبض",
    bodyTemp: "حرارة الجسم",
    bloodPressure: "ضغط الدم",
    vestBattery: "بطارية السترة",
    location: "الموقع",
    liveFeed: "البث المباشر",
    liveFeedDesc: "افتح بث كاميرا السترة في نافذة جديدة.",
    playback: "الإعادة",
    last10: "آخر ١٠ دقائق",
    playbackDesc: "إعادة عرض آخر تسجيل من السترة.",
    liveStream: "بث مباشر",
    connecting: "جارٍ الاتصال…",
    linkDown: "انقطع الاتصال",
    liveLinkError: "خطأ في الاتصال المباشر",
    liveLinkErrorDesc: (url: string, err: string) =>
      `تعذر الوصول إلى ${url} (${err}). تأكد من أن الجهاز اللوحي على نفس شبكة الواي فاي مع السترة، ومن فتح اللوحة عبر http:// (وليس https).`,
    nominal: "طبيعي",
    elevatedStatus: "مرتفع",
    criticalStatus: "حرج",
    offlineStatus: "غير متصل",
    soldierNotFound: "الجندي غير موجود",
    backToDashboard: "العودة إلى لوحة التحكم",
    bpm: "ن/د",
    mmHg: "مم زئبق",
    sectorOnline: "في الخدمة",
    signalLost: "انقطعت الإشارة",
  },
};

export type TranslationKey = keyof TranslationStrings;
