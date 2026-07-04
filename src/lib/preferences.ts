import AsyncStorage from "@react-native-async-storage/async-storage";

export type Madhab = "Hanafi" | "Shafi";

const MADHAB_KEY = "ummah.madhab";

export async function getMadhab(): Promise<Madhab> {
  const value = await AsyncStorage.getItem(MADHAB_KEY);
  return value === "Hanafi" ? "Hanafi" : "Shafi";
}

export async function setMadhab(value: Madhab): Promise<void> {
  await AsyncStorage.setItem(MADHAB_KEY, value);
}
