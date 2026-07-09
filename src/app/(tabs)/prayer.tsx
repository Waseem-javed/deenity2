import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";

import { AsyncState } from "@/components/ui/AsyncState";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { useTabBarClearance } from "@/hooks/useTabBarClearance";
import { computePrayerTimes, formatPrayerTime, type DailyPrayerTimes } from "@/lib/adhanTimes";
import { requestNotificationPermissions, scheduleAdhanNotifications } from "@/lib/notifications";
import { getMadhab, getSilentAdhan } from "@/lib/preferences";

const PRAYER_ORDER: { key: keyof DailyPrayerTimes; label: string; icon: keyof typeof MaterialCommunityIcons.glyphMap }[] = [
  { key: "fajr", label: "Fajr", icon: "weather-sunset-up" },
  { key: "sunrise", label: "Sunrise", icon: "weather-sunny" },
  { key: "dhuhr", label: "Dhuhr", icon: "weather-sunny" },
  { key: "asr", label: "Asr", icon: "weather-partly-cloudy" },
  { key: "maghrib", label: "Maghrib", icon: "weather-sunset-down" },
  { key: "isha", label: "Isha", icon: "weather-night" },
];

const CLOCK_FORMAT: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", second: "2-digit" };
const DATE_FORMAT: Intl.DateTimeFormatOptions = { weekday: "long", month: "long", day: "numeric" };

/** Each real prayer's window runs until the next one begins; Isha runs until the next day's Fajr. Sunrise has no window of its own. */
function getWindowEnd(key: keyof DailyPrayerTimes, times: DailyPrayerTimes, nextFajr: Date): Date | null {
  switch (key) {
    case "fajr":
      return times.sunrise;
    case "dhuhr":
      return times.asr;
    case "asr":
      return times.maghrib;
    case "maghrib":
      return times.isha;
    case "isha":
      return nextFajr;
    default:
      return null;
  }
}

export default function PrayerScreen() {
  const clearance = useTabBarClearance();
  const { coords, loading: locating, error: locationError, retry: retryLocation } = useCurrentLocation();
  const [times, setTimes] = useState<DailyPrayerTimes | null>(null);
  const [nextFajr, setNextFajr] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [now, setNow] = useState(() => new Date());

  const load = useCallback(async () => {
    if (!coords) return;
    setError(null);
    try {
      const madhab = await getMadhab();
      const computed = computePrayerTimes(coords.lat, coords.lng, madhab);
      setTimes(computed);

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setNextFajr(computePrayerTimes(coords.lat, coords.lng, madhab, tomorrow).fajr);

      const granted = await requestNotificationPermissions();
      if (granted) {
        const silent = await getSilentAdhan();
        await scheduleAdhanNotifications(computed, silent);
      }
    } catch {
      setError("Couldn't compute prayer times.");
    }
  }, [coords]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const active = useMemo(() => {
    if (!times || !nextFajr) return null;
    for (const entry of PRAYER_ORDER) {
      const end = getWindowEnd(entry.key, times, nextFajr);
      if (!end) continue;
      const start = times[entry.key];
      if (now >= start && now < end) return { ...entry, start, end };
    }
    return null;
  }, [times, nextFajr, now]);

  return (
    <ScreenContainer className="px-0 py-0">
      <View className="px-6 pb-2 pt-6">
        <Text className="text-3xl font-semibold text-slate-900 dark:text-white">Prayer Times</Text>
        <Text className="mt-1 text-base text-slate-600 dark:text-slate-300">Based on your current location</Text>

        <LinearGradient
          colors={["#1d4ed8", "#0f2f9e"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ borderRadius: 24, marginTop: 16, padding: 20 }}
        >
          <View className="flex-row items-center justify-between">
            <Text className="text-sm font-medium text-blue-100">{now.toLocaleDateString(undefined, DATE_FORMAT)}</Text>
            <MaterialCommunityIcons name="mosque" size={18} color="#bfdbfe" />
          </View>

          <Text className="mt-2 text-center text-5xl font-semibold tabular-nums text-white">
            {now.toLocaleTimeString(undefined, CLOCK_FORMAT)}
          </Text>
        </LinearGradient>
      </View>

      <AsyncState loading={locating} error={locationError ?? error} onRetry={locationError ? retryLocation : load}>
        <View className="gap-2 px-6" style={{ paddingBottom: clearance }}>
          {PRAYER_ORDER.map(({ key, label, icon }) => {
            const isActive = key === active?.key;
            return (
              <View
                key={key}
                className={[
                  "flex-row items-center justify-between rounded-2xl p-4 border-2",
                  isActive ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10" : "border-transparent bg-white dark:bg-slate-900",
                ].join(" ")}
                style={
                  isActive
                    ? { shadowColor: "#10b981", shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.35, shadowRadius: 10, elevation: 3 }
                    : undefined
                }
              >
                <View className="flex-row items-center gap-3">
                  <View
                    className={["h-10 w-10 items-center justify-center rounded-xl", isActive ? "bg-emerald-500/15" : "bg-brand-50 dark:bg-slate-800"].join(
                      " ",
                    )}
                  >
                    <MaterialCommunityIcons name={icon} size={20} color={isActive ? "#10b981" : "#1d4ed8"} />
                  </View>
                  <Text className="text-base font-medium text-slate-900 dark:text-white">{label}</Text>
                  {isActive ? (
                    <View className="rounded-full bg-emerald-500 px-2 py-0.5">
                      <Text className="text-xs font-semibold text-white">NOW</Text>
                    </View>
                  ) : null}
                </View>
                <Text className={isActive ? "text-base font-semibold text-emerald-600 dark:text-emerald-400" : "text-base text-slate-600 dark:text-slate-300"}>
                  {times ? formatPrayerTime(times[key]) : "—"}
                </Text>
              </View>
            );
          })}

          <Link href="/(tabs)/qibla" className="mt-2 text-center text-base font-medium text-brand-600 dark:text-brand-400">
            Find the Qibla direction →
          </Link>
        </View>
      </AsyncState>
    </ScreenContainer>
  );
}
