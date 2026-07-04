import * as Location from "expo-location";
import { useCallback, useEffect, useState } from "react";

export type Coordinates = { lat: number; lng: number };

type LocationState = {
  coords: Coordinates | null;
  loading: boolean;
  error: string | null;
};

export function useCurrentLocation() {
  const [state, setState] = useState<LocationState>({ coords: null, loading: true, error: null });

  const load = useCallback(async () => {
    setState({ coords: null, loading: true, error: null });
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setState({ coords: null, loading: false, error: "Location permission was denied." });
        return;
      }
      const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      setState({
        coords: { lat: position.coords.latitude, lng: position.coords.longitude },
        loading: false,
        error: null,
      });
    } catch {
      setState({ coords: null, loading: false, error: "Couldn't determine your location." });
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { ...state, retry: load };
}
