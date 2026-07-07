import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { FlatList, Pressable, Text, useWindowDimensions, View, type NativeScrollEvent, type NativeSyntheticEvent } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ZoomableImage } from "@/components/quran/ZoomableImage";
import { QURAN_TAJWEED_PAGES } from "@/constants/quranTajweedPages";

export default function TajweedParaScreen() {
  const { para } = useLocalSearchParams<{ para: string }>();
  const paraNumber = Number(para);
  const pages = QURAN_TAJWEED_PAGES[paraNumber] ?? [];
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { width, height } = useWindowDimensions();
  const [pageIndex, setPageIndex] = useState(0);

  // Mushaf pages are ordered right-to-left, so the list is rendered inverted:
  // page 1 sits at the right edge and a left-to-right swipe reveals the next page,
  // matching how a physical Mushaf is paged forward.
  function onScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    if (index !== pageIndex) setPageIndex(index);
  }

  return (
    <View className="flex-1 bg-black">
      <Stack.Screen options={{ headerShown: false }} />

      <FlatList
        data={pages}
        horizontal
        inverted
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => String(index)}
        getItemLayout={(_, index) => ({ length: width, offset: width * index, index })}
        onMomentumScrollEnd={onScroll}
        renderItem={({ item }) => (
          <View style={{ width, height }} className="items-center justify-center">
            <ZoomableImage source={item} width={width} height={height} />
          </View>
        )}
      />

      <View className="absolute left-0 right-0 top-0 flex-row items-center justify-between px-4" style={{ paddingTop: insets.top + 8 }}>
        <Pressable onPress={() => router.back()} className="h-10 w-10 items-center justify-center rounded-full bg-white/10 active:opacity-70">
          <MaterialCommunityIcons name="chevron-left" size={26} color="#fff" />
        </Pressable>
        <Text className="text-base font-semibold text-white">Para {paraNumber}</Text>
        <View className="h-10 w-10" />
      </View>

      {pages.length > 0 ? (
        <View
          className="absolute self-center rounded-full bg-white/10 px-3 py-1"
          style={{ bottom: insets.bottom + 16 }}
        >
          <Text className="text-xs font-medium text-white">
            Page {pageIndex + 1} / {pages.length}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
