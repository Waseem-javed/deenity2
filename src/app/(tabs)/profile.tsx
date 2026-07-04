import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { Text } from "react-native";

export default function ProfileScreen() {
  return (
    <ScreenContainer className="justify-center">
      <Text className="text-3xl font-semibold text-slate-900">Profile</Text>
      <Text className="mt-3 text-base text-slate-600">This is where account actions will live.</Text>
    </ScreenContainer>
  );
}
