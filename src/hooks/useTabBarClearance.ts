import { useSafeAreaInsets } from "react-native-safe-area-context";

const TAB_BAR_HEIGHT = 64;
const TAB_BAR_BOTTOM_OFFSET = 8;
const EXTRA_GAP = 16;

/** Bottom padding tab screens need so their content clears the floating (position: absolute) tab bar. */
export function useTabBarClearance(): number {
  const insets = useSafeAreaInsets();
  return TAB_BAR_HEIGHT + insets.bottom + TAB_BAR_BOTTOM_OFFSET + EXTRA_GAP;
}
