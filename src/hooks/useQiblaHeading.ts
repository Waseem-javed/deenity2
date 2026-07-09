import * as Location from "expo-location";
import { useEffect, useMemo, useState } from "react";

import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { computeQiblaDirection } from "@/lib/adhanTimes";

export const QIBLA_ALIGNMENT_TOLERANCE_DEG = 5;

export function angularDifference(a: number, b: number) {
  const diff = Math.abs(a - b) % 360;
  return diff > 180 ? 360 - diff : diff;
}

/** Live compass heading and Qibla alignment state, driven by the device's location and magnetometer. */
export function useQiblaHeading() {
  const { coords, loading, error, retry } = useCurrentLocation();
  const [heading, setHeading] = useState<number | null>(null);

  const qiblaBearing = useMemo(() => (coords ? computeQiblaDirection(coords.lat, coords.lng) : null), [coords]);

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

  const aligned = qiblaBearing !== null && heading !== null && angularDifference(qiblaBearing, heading) <= QIBLA_ALIGNMENT_TOLERANCE_DEG;

  return { heading, qiblaBearing, aligned, loading, error, retry };
}
