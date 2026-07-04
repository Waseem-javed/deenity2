import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

import { AsyncState } from "@/components/ui/AsyncState";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { DuaService } from "@/services/ummah/duas";

type Dua = {
  id: number;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  source: string;
  repeat: number;
};

export default function DuaCategoryScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();

  const [title, setTitle] = useState(category);
  const [duas, setDuas] = useState<Dua[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await DuaService.getDuaByCategory(category);
      const data = response.data?.data ?? {};
      setTitle(data.category?.name ?? category);
      setDuas(Array.isArray(data.duas) ? data.duas : []);
    } catch {
      setError("Couldn't load these duas.");
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <ScreenContainer className="px-0 py-0" edges={["top", "left", "right", "bottom"]}>
      <View className="px-6 pb-2 pt-6">
        <Text className="text-2xl font-semibold text-slate-900">{title}</Text>
      </View>

      <AsyncState loading={loading} error={error} onRetry={load}>
        <FlatList
          data={duas}
          keyExtractor={(item) => String(item.id)}
          contentContainerClassName="px-6 pb-6 gap-3"
          renderItem={({ item }) => (
            <View className="rounded-2xl bg-white p-4">
              <Text className="text-base font-semibold text-slate-900">{item.title}</Text>
              <Text className="mt-2 text-right text-xl leading-9 text-slate-900">{item.arabic}</Text>
              {item.transliteration ? <Text className="mt-2 text-sm italic leading-6 text-slate-500">{item.transliteration}</Text> : null}
              {item.translation ? <Text className="mt-2 text-sm leading-6 text-slate-600">{item.translation}</Text> : null}
              {item.source ? <Text className="mt-2 text-xs text-slate-400">{item.source}</Text> : null}
            </View>
          )}
        />
      </AsyncState>
    </ScreenContainer>
  );
}
