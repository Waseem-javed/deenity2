import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useColorScheme } from "nativewind";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type TabIconProps = {
  name: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
  size: number;
  focused: boolean;
  isDark: boolean;
};

function TabIcon({ name, color, size, focused, isDark }: TabIconProps) {
  return (
    <View
      className="items-center justify-center rounded-full py-1"
    >
      <MaterialCommunityIcons name={name} color={color} size={size} />
    </View>
  );
}

export default function TabsLayout() {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: isDark ? "#60a5fa" : "#1d4ed8",
        tabBarInactiveTintColor: isDark ? "#64748b" : "#94a3b8",
        tabBarShowLabel: true,
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600", marginTop: -2 },
        tabBarItemStyle: { paddingTop: 6 },
        tabBarStyle: {
          position: "absolute",
          left: insets.left,
          right: insets.right,
          bottom: insets.bottom,
          marginLeft: insets.left + 20,
          marginRight: insets.right + 20,
          height: 64,
          borderRadius: 28,
          borderTopWidth: 0,
          backgroundColor: isDark ? "#0f172a" : "#ffffff",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: isDark ? 0.4 : 0.1,
          shadowRadius: 20,
          elevation: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="view-dashboard-outline" color={color} size={size} focused={focused} isDark={isDark} />
          ),
        }}
      />
      <Tabs.Screen
        name="quran"
        options={{
          title: "Quran",
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="book-open-page-variant-outline" color={color} size={size} focused={focused} isDark={isDark} />
          ),
        }}
      />
      <Tabs.Screen
        name="prayer"
        options={{
          title: "Prayer",
          tabBarIcon: ({ color, size, focused }) => <TabIcon name="mosque" color={color} size={size} focused={focused} isDark={isDark} />,
        }}
      />
      <Tabs.Screen
        name="qibla"
        options={{
          title: "Qibla",
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="compass-outline" color={color} size={size} focused={focused} isDark={isDark} />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="dots-horizontal-circle-outline" color={color} size={size} focused={focused} isDark={isDark} />
          ),
        }}
      />
    </Tabs>
  );
}
