export interface ZakatBody {
  /** Current gold price per gram (required when using gold nisab or gold_grams > 0) */
  gold_price_per_gram: number;

  /** Current silver price per gram (required when using silver nisab or silver_grams > 0) */
  silver_price_per_gram?: number;

  /** Nisab standard: "gold" or "silver" */
  nisab_standard?: "gold" | "silver";

  /** Cash and bank savings */
  cash?: number;

  /** Gold owned in grams */
  gold_grams?: number;

  /** Silver owned in grams */
  silver_grams?: number;

  /** Monetary value of stocks/shares */
  stocks?: number;

  /** Monetary value of business/trade inventory */
  business_goods?: number;

  /** Monetary value of other investments */
  other_investments?: number;

  /** Outstanding liabilities/debts */
  liabilities?: number;
}
