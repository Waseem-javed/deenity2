import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import * as Location from "expo-location";
import { useEffect, useMemo, useRef, useState } from "react";
import { Text, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming, type SharedValue } from "react-native-reanimated";

import { AsyncState } from "@/components/ui/AsyncState";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { computeQiblaDirection } from "@/lib/adhanTimes";

const ALIGNMENT_TOLERANCE_DEG = 5;
const DIAL_RADIUS = 78;

const CARDINALS = [
  { label: "N", angle: 0 },
  { label: "E", angle: 90 },
  { label: "S", angle: 180 },
  { label: "W", angle: 270 },
];

function angularDifference(a: number, b: number) {
  const diff = Math.abs(a - b) % 360;
  return diff > 180 ? 360 - diff : diff;
}

/** Picks the equivalent target angle closest to `current`, so the needle animates the short way around. */
function shortestRotation(current: number, targetMod360: number) {
  const currentMod = ((current % 360) + 360) % 360;
  let delta = targetMod360 - currentMod;
  if (delta > 180) delta -= 360;
  if (delta < -180) delta += 360;
  return current + delta;
}

function CardinalLabel({ label, angle, dialRotation }: { label: string; angle: number; dialRotation: SharedValue<number> }) {
  const style = useAnimatedStyle(() => {
    const placementAngle = angle + dialRotation.value;
    return {
      transform: [{ rotate: `${placementAngle}deg` }, { translateY: -DIAL_RADIUS }, { rotate: `${-placementAngle}deg` }],
    };
  });

  return (
    <Animated.View style={[{ position: "absolute", top: "50%", left: "50%" }, style]}>
      <Text className="text-sm font-semibold text-slate-400 dark:text-slate-500">{label}</Text>
    </Animated.View>
  );
}

export default function QiblaScreen() {
  const { coords, loading: locating, error: locationError, retry: retryLocation } = useCurrentLocation();
  const [heading, setHeading] = useState<number | null>(null);

  const qiblaBearing = useMemo(() => (coords ? computeQiblaDirection(coords.lat, coords.lng) : null), [coords]);

  const rotation = useSharedValue(0);
  const dialRotation = useSharedValue(0);
  const wasAligned = useRef(false);

  useEffect(() => {
    if (!coords) return;
    let subscription: Location.LocationSubscription | null = null;
    let cancelled = false;

    Location.watchHeadingAsync((event) => {
      setHeading(event.trueHeading >= 0 ? event.trueHeading : event.magHeading);
    }).then((sub) => {
      if (cancelled) sub.remove();
      else subscription = sub;
    });

    return () => {
      cancelled = true;
      subscription?.remove();
    };
  }, [coords]);

  const aligned = qiblaBearing !== null && heading !== null && angularDifference(qiblaBearing, heading) <= ALIGNMENT_TOLERANCE_DEG;

  useEffect(() => {
    if (heading === null) return;
    const dialTarget = ((-heading % 360) + 360) % 360;
    dialRotation.value = withTiming(shortestRotation(dialRotation.value, dialTarget), { duration: 200 });

    if (qiblaBearing === null) return;
    const target = ((qiblaBearing - heading) % 360 + 360) % 360;
    rotation.value = withTiming(shortestRotation(rotation.value, target), { duration: 200 });

    if (aligned && !wasAligned.current) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    wasAligned.current = aligned;
  }, [qiblaBearing, heading, aligned, rotation, dialRotation]);

  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ rotate: `${rotation.value}deg` }] }));

  return (
    <ScreenContainer className="items-center justify-center" edges={["top", "left", "right", "bottom"]}>
      <Text className="text-3xl font-semibold text-slate-900 dark:text-white">Qibla Direction</Text>
      <Text className="mt-1 text-center text-base text-slate-600 dark:text-slate-300">
        Hold your phone flat and turn until the arrow points up
      </Text>

      <AsyncState loading={locating} error={locationError} onRetry={retryLocation}>
        <View className="mt-10 items-center justify-center">
          <View
            className={[
              "h-48 w-48 items-center justify-center rounded-full bg-white dark:bg-slate-900 border-2",
              aligned ? "border-emerald-500" : "border-transparent",
            ].join(" ")}
            style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 16, elevation: 2 }}
          >
            {CARDINALS.map((cardinal) => (
              <CardinalLabel key={cardinal.label} label={cardinal.label} angle={cardinal.angle} dialRotation={dialRotation} />
            ))}

            <Animated.View style={animatedStyle}>
              <MaterialCommunityIcons name="navigation" size={64} color={aligned ? "#10b981" : "#1d4ed8"} />
            </Animated.View>
          </View>
          <Text className="mt-6 text-2xl font-semibold text-slate-900 dark:text-white">
            {qiblaBearing !== null ? `${Math.round(qiblaBearing)}°` : "—"}
          </Text>
          <Text className="mt-1 text-sm text-slate-500 dark:text-slate-400">from true north</Text>
          {aligned ? <Text className="mt-3 text-sm font-medium text-emerald-600 dark:text-emerald-400">Facing the Qibla</Text> : null}
        </View>
      </AsyncState>
    </ScreenContainer>
  );
}
