import * as Haptics from "expo-haptics";
import { useEffect, useRef } from "react";

import { useQiblaHeading } from "@/hooks/useQiblaHeading";

/** Mounted globally so the alignment vibration fires no matter which tab is active, not just the Qibla screen. */
export function QiblaAlignmentAlert() {
  const { aligned } = useQiblaHeading();
  const wasAligned = useRef(false);

  useEffect(() => {
    if (aligned && !wasAligned.current) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    wasAligned.current = aligned;
  }, [aligned]);

  return null;
}
