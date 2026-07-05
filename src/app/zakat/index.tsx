import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";

import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { ZakatService } from "@/services/ummah/zakat";

const FIELDS: { key: "cash" | "gold_grams" | "gold_price_per_gram" | "silver_grams" | "silver_price_per_gram" | "liabilities"; label: string }[] = [
  { key: "cash", label: "Cash & bank savings" },
  { key: "gold_grams", label: "Gold owned (grams)" },
  { key: "gold_price_per_gram", label: "Gold price per gram" },
  { key: "silver_grams", label: "Silver owned (grams)" },
  { key: "silver_price_per_gram", label: "Silver price per gram" },
  { key: "liabilities", label: "Outstanding liabilities" },
];

export default function ZakatScreen() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ dueFormatted: string; aboveNisab: boolean; note: string } | null>(null);

  async function calculate() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const goldPricePerGram = Number(values.gold_price_per_gram) || 0;
      const response = await ZakatService.zakatCalculate({
        gold_price_per_gram: goldPricePerGram,
        silver_price_per_gram: Number(values.silver_price_per_gram) || undefined,
        cash: Number(values.cash) || undefined,
        gold_grams: Number(values.gold_grams) || undefined,
        silver_grams: Number(values.silver_grams) || undefined,
        liabilities: Number(values.liabilities) || undefined,
      });
      const data = response.data?.data ?? {};
      setResult({
        dueFormatted: data.zakat_due_formatted ?? String(data.zakat_due ?? 0),
        aboveNisab: Boolean(data.above_nisab),
        note: data.note ?? "",
      });
    } catch {
      setError("Couldn't calculate Zakat right now.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScreenContainer className="px-0 py-0" edges={["left", "right", "bottom"]}>
      <ScrollView contentContainerClassName="px-6 pt-4 pb-6 gap-3" keyboardShouldPersistTaps="handled">
        <Text className="mb-2 text-base text-slate-600 dark:text-slate-300">Fill in what applies to you</Text>

        {FIELDS.map(({ key, label }) => (
          <TextInput
            key={key}
            mode="outlined"
            label={label}
            keyboardType="numeric"
            value={values[key] ?? ""}
            onChangeText={(text) => setValues((prev) => ({ ...prev, [key]: text }))}
          />
        ))}

        <Button mode="contained" onPress={calculate} loading={loading} disabled={loading} style={{ marginTop: 8 }} icon="calculator-variant-outline">
          Calculate Zakat
        </Button>

        {error ? <Text className="text-center text-base text-slate-600 dark:text-slate-300">{error}</Text> : null}

        {result !== null ? (
          <View className="mt-2 items-center rounded-2xl bg-brand-50 dark:bg-slate-800 p-6">
            <Text className="text-sm font-medium text-brand-600 dark:text-brand-400">{result.aboveNisab ? "Zakat due" : "Below nisab"}</Text>
            <Text className="mt-1 text-3xl font-semibold text-slate-900 dark:text-white">{result.dueFormatted}</Text>
            {result.note ? <Text className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">{result.note}</Text> : null}
          </View>
        ) : null}
      </ScrollView>
    </ScreenContainer>
  );
}
