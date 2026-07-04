import { Link, Stack } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Not found" }} />
      <SafeAreaView className="flex-1 items-center justify-center bg-slate-50 px-6">
        <Text className="text-xl font-semibold text-slate-900">This screen doesn’t exist.</Text>
        <Link href="/" className="mt-4 text-base text-brand-600">
          Go to home
        </Link>
      </SafeAreaView>
    </>
  );
}
