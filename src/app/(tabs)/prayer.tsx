import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Link } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { AsyncState } from "@/components/ui/AsyncState";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { getMadhab } from "@/lib/preferences";
import { PrayerService } from "@/services/ummah/prayer";

type PrayerTimes = Partial<Record<"imsak" | "fajr" | "sunrise" | "dhuhr" | "asr" | "maghrib" | "isha", string>>;

function todayIsoDate() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

const PRAYER_ORDER: { key: keyof PrayerTimes; label: string; icon: keyof typeof MaterialCommunityIcons.glyphMap }[] = [
  { key: "imsak", label: "Imsak", icon: "weather-night-partly-cloudy" },
  { key: "fajr", label: "Fajr", icon: "weather-sunset-up" },
  { key: "sunrise", label: "Sunrise", icon: "weather-sunny" },
  { key: "dhuhr", label: "Dhuhr", icon: "weather-sunny" },
  { key: "asr", label: "Asr", icon: "weather-partly-cloudy" },
  { key: "maghrib", label: "Maghrib", icon: "weather-sunset-down" },
  { key: "isha", label: "Isha", icon: "weather-night" },
];

export default function PrayerScreen() {
  const { coords, loading: locating, error: locationError, retry: retryLocation } = useCurrentLocation();
  const [times, setTimes] = useState<PrayerTimes | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!coords) return;
    setLoading(true);
    setError(null);
    try {
      const madhab = await getMadhab();
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const response = await PrayerService.getPrayerTimes({ lat: coords.lat, lng: coords.lng, madhab, timezone, date: todayIsoDate() });
      const data = response.data?.data?.prayer_times ?? {};
      setTimes(data);
    } catch {
      setError("Couldn't load prayer times.");
    } finally {
      setLoading(false);
    }
  }, [coords]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <ScreenContainer className="px-0 py-0">
      <View className="px-6 pb-2 pt-6">
        <Text className="text-3xl font-semibold text-slate-900">Prayer Times</Text>
        <Text className="mt-1 text-base text-slate-600">Based on your current location</Text>
      </View>

      <AsyncState loading={locating || loading} error={locationError ?? error} onRetry={locationError ? retryLocation : load}>
        <View className="gap-2 px-6 pb-6">
          {PRAYER_ORDER.map(({ key, label, icon }) => (
            <View key={key} className="flex-row items-center justify-between rounded-2xl bg-white p-4">
              <View className="flex-row items-center gap-3">
                <MaterialCommunityIcons name={icon} size={20} color="#1d4ed8" />
                <Text className="text-base font-medium text-slate-900">{label}</Text>
              </View>
              <Text className="text-base text-slate-600">{times?.[key] ?? "—"}</Text>
            </View>
          ))}

          <Link href="/qibla" className="mt-2 text-center text-base font-medium text-brand-600">
            Find the Qibla direction →
          </Link>
        </View>
      </AsyncState>
    </ScreenContainer>
  );
}
