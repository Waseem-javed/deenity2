import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AdhanPlayer } from "@/components/AdhanPlayer";
import "../../global.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <StatusBar style="dark" />
        <AdhanPlayer />
        <Stack screenOptions={{ headerShown: false }} />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
