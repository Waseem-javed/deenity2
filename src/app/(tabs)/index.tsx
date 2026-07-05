import { FeatureCard } from "@/components/ui/FeatureCard";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { ScrollView, Text, View } from "react-native";

const FEATURES = [
  { href: "/(tabs)/quran" as const, title: "Quran", subtitle: "16-line Indopak Mushaf", icon: "book-open-page-variant-outline", tone: "brand" },
  { href: "/(tabs)/prayer" as const, title: "Prayer Times", subtitle: "Today's five prayers", icon: "mosque", tone: "emerald" },
  { href: "/(tabs)/qibla" as const, title: "Qibla", subtitle: "Find the direction", icon: "compass-outline", tone: "amber" },
  { href: "/duas" as const, title: "Duas", subtitle: "Everyday supplications", icon: "hands-pray", tone: "rose" },
  { href: "/asma" as const, title: "99 Names", subtitle: "Names of Allah", icon: "star-four-points-outline", tone: "brand" },
  { href: "/names" as const, title: "Islamic Names", subtitle: "Meanings for babies", icon: "account-child-outline", tone: "emerald" },
  { href: "/zakat" as const, title: "Zakat", subtitle: "Calculate what's due", icon: "calculator-variant-outline", tone: "amber" },
  { href: "/hadith" as const, title: "Hadith", subtitle: "Collections & search", icon: "book-account-outline", tone: "rose" },
] as const;

export default function HomeScreen() {
  return (
    <ScreenContainer className="px-0 py-0">
      <ScrollView className="flex-1" contentContainerClassName="px-6 py-6" showsVerticalScrollIndicator={false}>
        <Text className="text-sm font-medium text-brand-600 dark:text-brand-400">Assalamu Alaikum</Text>
        <Text className="mt-1 text-3xl font-semibold text-slate-900 dark:text-white">Welcome to Ummah</Text>
        <Text className="mt-2 text-base text-slate-600 dark:text-slate-300">Everything for your daily worship, in one place.</Text>

        <View className="mt-6 flex-row flex-wrap justify-between gap-y-4">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.href} {...feature} />
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
