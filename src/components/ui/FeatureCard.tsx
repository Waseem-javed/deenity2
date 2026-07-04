import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, type Href } from "expo-router";
import { Pressable, Text, View } from "react-native";

type FeatureCardProps = {
  href: Href;
  title: string;
  subtitle: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  tone?: "brand" | "amber" | "emerald" | "rose";
};

const TONES = {
  brand: { bg: "bg-brand-50", fg: "#1d4ed8" },
  amber: { bg: "bg-amber-50", fg: "#b45309" },
  emerald: { bg: "bg-emerald-50", fg: "#047857" },
  rose: { bg: "bg-rose-50", fg: "#be123c" },
} as const;

export function FeatureCard({ href, title, subtitle, icon, tone = "brand" }: FeatureCardProps) {
  const { bg, fg } = TONES[tone];

  return (
    <Link href={href} asChild>
      <Pressable
        className="w-[48%] rounded-2xl bg-white p-4 active:opacity-70"
        style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 1 }}
      >
        <View className={["h-11 w-11 items-center justify-center rounded-xl", bg].join(" ")}>
          <MaterialCommunityIcons name={icon} size={22} color={fg} />
        </View>
        <Text className="mt-3 text-base font-semibold text-slate-900">{title}</Text>
        <Text className="mt-1 text-sm text-slate-500" numberOfLines={2}>
          {subtitle}
        </Text>
      </Pressable>
    </Link>
  );
}
