import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

import { AsyncState } from "@/components/ui/AsyncState";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { HadithService } from "@/services/ummah/hadits";

type Hadith = { id: string; hadithnumber: number; arabic: string; english: string; grade?: string };

export default function HadithCollectionScreen() {
  const { collection } = useLocalSearchParams<{ collection: string }>();

  const [title, setTitle] = useState(collection);
  const [hadiths, setHadiths] = useState<Hadith[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await HadithService.browseHadith({ collection, page: 1, limit: 30 });
      const data = response.data?.data ?? {};
      setTitle(data.collection_name ?? collection);
      setHadiths(Array.isArray(data.hadiths) ? data.hadiths : []);
    } catch {
      setError("Couldn't load this collection.");
    } finally {
      setLoading(false);
    }
  }, [collection]);

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
          data={hadiths}
          keyExtractor={(item) => item.id}
          contentContainerClassName="px-6 pb-6 gap-3"
          renderItem={({ item }) => (
            <View className="rounded-2xl bg-white p-4">
              <Text className="text-xs font-medium text-brand-600">Hadith {item.hadithnumber}</Text>
              <Text className="mt-2 text-right text-lg leading-8 text-slate-900">{item.arabic}</Text>
              <Text className="mt-2 text-sm leading-6 text-slate-700">{item.english}</Text>
              {item.grade ? <Text className="mt-2 text-xs text-slate-500">Grade: {item.grade}</Text> : null}
            </View>
          )}
        />
      </AsyncState>
    </ScreenContainer>
  );
}
