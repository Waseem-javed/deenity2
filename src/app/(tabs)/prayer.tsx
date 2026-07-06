import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Link } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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

export default function PrayerScreen() {
  const clearance = useTabBarClearance();
  const { coords, loading: locating, error: locationError, retry: retryLocation } = useCurrentLocation();
  const [times, setTimes] = useState<DailyPrayerTimes | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!coords) return;
    setError(null);
    try {
      const madhab = await getMadhab();
      const computed = computePrayerTimes(coords.lat, coords.lng, madhab);
      setTimes(computed);

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

  return (
    <ScreenContainer className="px-0 py-0">
      <View className="px-6 pb-2 pt-6">
        <Text className="text-3xl font-semibold text-slate-900 dark:text-white">Prayer Times</Text>
        <Text className="mt-1 text-base text-slate-600 dark:text-slate-300">Based on your current location</Text>
      </View>

      <AsyncState loading={locating} error={locationError ?? error} onRetry={locationError ? retryLocation : load}>
        <View className="gap-2 px-6" style={{ paddingBottom: clearance }}>
          {PRAYER_ORDER.map(({ key, label, icon }) => (
            <View key={key} className="flex-row items-center justify-between rounded-2xl bg-white dark:bg-slate-900 p-4">
              <View className="flex-row items-center gap-3">
                <MaterialCommunityIcons name={icon} size={20} color="#1d4ed8" />
                <Text className="text-base font-medium text-slate-900 dark:text-white">{label}</Text>
              </View>
              <Text className="text-base text-slate-600 dark:text-slate-300">{times ? formatPrayerTime(times[key]) : "—"}</Text>
            </View>
          ))}

          <Link href="/(tabs)/qibla" className="mt-2 text-center text-base font-medium text-brand-600 dark:text-brand-400">
            Find the Qibla direction →
          </Link>
        </View>
      </AsyncState>
    </ScreenContainer>
  );
}
