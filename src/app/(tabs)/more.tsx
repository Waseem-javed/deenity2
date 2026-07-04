import { useEffect, useState } from "react";
import { router } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { Button, SegmentedButtons } from "react-native-paper";

import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { setHasOnboarded } from "@/lib/onboarding";
import { getMadhab, setMadhab, type Madhab } from "@/lib/preferences";

export default function MoreScreen() {
  const [madhab, setMadhabState] = useState<Madhab>("Shafi");

  useEffect(() => {
    getMadhab().then(setMadhabState);
  }, []);

  async function updateMadhab(value: Madhab) {
    setMadhabState(value);
    await setMadhab(value);
  }

  async function replayOnboarding() {
    await setHasOnboarded(false);
    router.replace("/onboarding");
  }

  return (
    <ScreenContainer className="px-0 py-0">
      <ScrollView contentContainerClassName="px-6 py-6 gap-6" showsVerticalScrollIndicator={false}>
        <View>
          <Text className="text-3xl font-semibold text-slate-900">More</Text>
          <Text className="mt-1 text-base text-slate-600">Preferences & about</Text>
        </View>

        <View className="rounded-2xl bg-white p-4">
          <Text className="text-base font-semibold text-slate-900">Asr calculation (madhab)</Text>
          <Text className="mt-1 text-sm text-slate-500">Affects when Asr prayer time is shown.</Text>
          <SegmentedButtons
            value={madhab}
            onValueChange={(value) => updateMadhab(value as Madhab)}
            style={{ marginTop: 12 }}
            buttons={[
              { value: "Shafi", label: "Shafi" },
              { value: "Hanafi", label: "Hanafi" },
            ]}
          />
        </View>

        <View className="rounded-2xl bg-white p-4">
          <Text className="text-base font-semibold text-slate-900">Ummah</Text>
          <Text className="mt-1 text-sm text-slate-500">Version 1.0.0</Text>
          <Button mode="outlined" onPress={replayOnboarding} style={{ marginTop: 12 }} icon="restart">
            Replay welcome tour
          </Button>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
