import { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { Link } from "expo-router";

import { AsyncState } from "@/components/ui/AsyncState";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { HadithService } from "@/services/ummah/hadits";

type Collection = { key: string; name: string; arabic_name: string; author: string; reliability: string; total_hadiths: number };
type RandomHadith = { collection_name: string; arabic: string; english: string; grade: string };

export default function HadithScreen() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [random, setRandom] = useState<RandomHadith | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [collectionsRes, randomRes] = await Promise.all([HadithService.hadithCollections(), HadithService.randomHadith()]);
      const collectionsData = collectionsRes.data?.data?.collections ?? [];
      setCollections(Array.isArray(collectionsData) ? collectionsData : []);
      setRandom(randomRes.data?.data ?? null);
    } catch {
      setError("Couldn't load hadith collections.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <ScreenContainer className="px-0 py-0" edges={["top", "left", "right", "bottom"]}>
      <View className="px-6 pb-2 pt-6">
        <Text className="text-3xl font-semibold text-slate-900">Hadith</Text>
        <Text className="mt-1 text-base text-slate-600">Collections & daily hadith</Text>
      </View>

      <AsyncState loading={loading} error={error} onRetry={load}>
        <FlatList
          data={collections}
          keyExtractor={(item) => item.key}
          contentContainerClassName="px-6 pb-6 gap-3"
          ListHeaderComponent={
            random ? (
              <View className="mb-3 rounded-2xl bg-brand-50 p-4">
                <Text className="text-xs font-medium text-brand-600">Hadith of the moment · {random.collection_name}</Text>
                <Text className="mt-2 text-right text-lg leading-8 text-slate-900">{random.arabic}</Text>
                <Text className="mt-2 text-sm leading-6 text-slate-700">{random.english}</Text>
                {random.grade ? <Text className="mt-2 text-xs text-slate-500">Grade: {random.grade}</Text> : null}
              </View>
            ) : null
          }
          renderItem={({ item }) => (
            <Link href={`/hadith/${item.key}`} asChild>
              <Pressable className="flex-row items-center justify-between rounded-2xl bg-white p-4 active:opacity-70">
                <View className="flex-1 pr-3">
                  <Text className="text-base font-semibold text-slate-900">{item.name}</Text>
                  <Text className="mt-0.5 text-sm text-slate-500">
                    {item.author} · {item.total_hadiths.toLocaleString()} hadiths
                  </Text>
                </View>
                <Text className="text-lg text-slate-700">{item.arabic_name}</Text>
              </Pressable>
            </Link>
          )}
        />
      </AsyncState>
    </ScreenContainer>
  );
}
