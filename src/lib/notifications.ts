import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

import type { DailyPrayerTimes } from "@/lib/adhanTimes";

const ADHAN_CHANNEL_ID = "adhan";
const ADHAN_SOUND = "adhan-notification.wav";

const PRAYER_LABELS: Record<keyof DailyPrayerTimes, string> = {
  fajr: "Fajr",
  sunrise: "Sunrise",
  dhuhr: "Dhuhr",
  asr: "Asr",
  maghrib: "Maghrib",
  isha: "Isha",
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function requestNotificationPermissions(): Promise<boolean> {
  const existing = await Notifications.getPermissionsAsync();
  if (existing.granted) return true;
  const requested = await Notifications.requestPermissionsAsync();
  return requested.granted;
}

async function ensureAndroidChannel() {
  if (Platform.OS !== "android") return;
  await Notifications.setNotificationChannelAsync(ADHAN_CHANNEL_ID, {
    name: "Adhan",
    importance: Notifications.AndroidImportance.HIGH,
    sound: ADHAN_SOUND,
  });
}

/** Schedules today's remaining prayers as local notifications, replacing any previously scheduled ones. */
export async function scheduleAdhanNotifications(times: DailyPrayerTimes): Promise<void> {
  await ensureAndroidChannel();
  await Notifications.cancelAllScheduledNotificationsAsync();

  const now = new Date();
  const prayerKeys = (Object.keys(times) as (keyof DailyPrayerTimes)[]).filter((key) => key !== "sunrise");

  for (const key of prayerKeys) {
    const date = times[key];
    if (date <= now) continue;
    await Notifications.scheduleNotificationAsync({
      identifier: `adhan-${key}`,
      content: {
        title: `${PRAYER_LABELS[key]} Adhan`,
        body: "It's time to pray.",
        sound: ADHAN_SOUND,
        data: { prayer: key },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date,
        channelId: ADHAN_CHANNEL_ID,
      },
    });
  }
}
