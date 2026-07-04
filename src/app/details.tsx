import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { Link } from "expo-router";
import { Text } from "react-native";
import { Button, Surface } from "react-native-paper";

export default function DetailsScreen() {
  return (
    <ScreenContainer className="justify-center" edges={["top", "left", "right", "bottom"]}>
      <Surface style={{ borderRadius: 24, backgroundColor: "#fff", padding: 24, elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 12 }}>
        <Text className="text-3xl font-semibold text-slate-900">Details</Text>
        <Text className="mt-3 text-base text-slate-600">This route demonstrates simple navigation and shared layout components.</Text>
        <Link href="/(tabs)" asChild>
          <Button mode="outlined" style={{ marginTop: 24 }} icon="home">
            Back to home
          </Button>
        </Link>
      </Surface>
    </ScreenContainer>
  );
}
