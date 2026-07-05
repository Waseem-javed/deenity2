import AsyncStorage from "@react-native-async-storage/async-storage";

export type Madhab = "Hanafi" | "Shafi";
export type ThemePreference = "light" | "dark";

const MADHAB_KEY = "ummah.madhab";
const SILENT_ADHAN_KEY = "ummah.silentAdhan";
const THEME_KEY = "ummah.theme";

export async function getMadhab(): Promise<Madhab> {
  const value = await AsyncStorage.getItem(MADHAB_KEY);
  return value === "Hanafi" ? "Hanafi" : "Shafi";
}

export async function setMadhab(value: Madhab): Promise<void> {
  await AsyncStorage.setItem(MADHAB_KEY, value);
}

export async function getSilentAdhan(): Promise<boolean> {
  return (await AsyncStorage.getItem(SILENT_ADHAN_KEY)) === "true";
}

export async function setSilentAdhan(value: boolean): Promise<void> {
  await AsyncStorage.setItem(SILENT_ADHAN_KEY, value ? "true" : "false");
}

/** Returns null if the user hasn't made an explicit choice yet (falls back to the system theme). */
export async function getThemePreference(): Promise<ThemePreference | null> {
  const value = await AsyncStorage.getItem(THEME_KEY);
  return value === "light" || value === "dark" ? value : null;
}

export async function setThemePreference(value: ThemePreference): Promise<void> {
  await AsyncStorage.setItem(THEME_KEY, value);
}
