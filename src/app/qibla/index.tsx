import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";

import { AsyncState } from "@/components/ui/AsyncState";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { QiblaService } from "@/services/ummah/qibla";

export default function QiblaScreen() {
  const { coords, loading: locating, error: locationError, retry: retryLocation } = useCurrentLocation();
  const [bearing, setBearing] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!coords) return;
    setLoading(true);
    setError(null);
    try {
      const response = await QiblaService.getQibla({ lat: coords.lat, lng: coords.lng });
      const data = response.data?.data ?? {};
      setBearing(typeof data.qibla_direction === "number" ? data.qibla_direction : null);
      setMessage(data.at_kaaba ? data.message : null);
    } catch {
      setError("Couldn't calculate the Qibla direction.");
    } finally {
      setLoading(false);
    }
  }, [coords]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <ScreenContainer className="items-center justify-center" edges={["top", "left", "right", "bottom"]}>
      <Text className="text-3xl font-semibold text-slate-900">Qibla Direction</Text>
      <Text className="mt-1 text-center text-base text-slate-600">Point your device towards the number below</Text>

      <AsyncState loading={locating || loading} error={locationError ?? error} onRetry={locationError ? retryLocation : load}>
        <View className="mt-10 items-center justify-center">
          <View
            className="h-48 w-48 items-center justify-center rounded-full bg-white"
            style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 16, elevation: 2 }}
          >
            <MaterialCommunityIcons
              name="navigation"
              size={72}
              color="#1d4ed8"
              style={{ transform: [{ rotate: `${bearing ?? 0}deg` }] }}
            />
          </View>
          <Text className="mt-6 text-2xl font-semibold text-slate-900">{bearing !== null ? `${Math.round(bearing)}°` : "—"}</Text>
          <Text className="mt-1 text-sm text-slate-500">from true north</Text>
          {message ? <Text className="mt-3 text-center text-sm text-brand-600">{message}</Text> : null}
        </View>
      </AsyncState>
    </ScreenContainer>
  );
}
