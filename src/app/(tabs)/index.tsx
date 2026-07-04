import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { Link } from "expo-router";
import { Text } from "react-native";
import { Button, Surface } from "react-native-paper";

export default function HomeScreen() {
  return (
    <ScreenContainer className="justify-center">
      <Surface style={{ borderRadius: 24, backgroundColor: "#fff", padding: 24, elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 12 }}>
        <Text className="text-3xl font-semibold text-slate-900">Welcome to Ummah</Text>
        <Text className="mt-3 text-base text-slate-600">A polished Expo starter with Tailwind styling and tab navigation.</Text>
        <Link href="/details" asChild>
          <Button mode="contained" style={{ marginTop: 24 }} icon="arrow-right">
            Open details
          </Button>
        </Link>
      </Surface>
    </ScreenContainer>
  );
}
