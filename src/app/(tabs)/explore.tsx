import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { Text } from "react-native";

export default function ExploreScreen() {
  return (
    <ScreenContainer className="justify-center">
      <Text className="text-3xl font-semibold text-slate-900">Explore</Text>
      <Text className="mt-3 text-base text-slate-600">Use this space for communities, content, or discovery.</Text>
    </ScreenContainer>
  );
}
