import AsyncStorage from "@react-native-async-storage/async-storage";

const HAS_ONBOARDED_KEY = "ummah.hasOnboarded";

export async function getHasOnboarded(): Promise<boolean> {
  return (await AsyncStorage.getItem(HAS_ONBOARDED_KEY)) === "true";
}

export async function setHasOnboarded(value: boolean): Promise<void> {
  await AsyncStorage.setItem(HAS_ONBOARDED_KEY, value ? "true" : "false");
}
