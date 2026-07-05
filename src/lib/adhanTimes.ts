import { CalculationMethod, Coordinates, Madhab as AdhanMadhab, PrayerTimes, Qibla } from "adhan";

import type { Madhab } from "@/lib/preferences";

export type DailyPrayerTimes = {
  fajr: Date;
  sunrise: Date;
  dhuhr: Date;
  asr: Date;
  maghrib: Date;
  isha: Date;
};

export function computePrayerTimes(lat: number, lng: number, madhab: Madhab, date: Date = new Date()): DailyPrayerTimes {
  const coordinates = new Coordinates(lat, lng);
  const params = CalculationMethod.MuslimWorldLeague();
  params.madhab = madhab === "Hanafi" ? AdhanMadhab.Hanafi : AdhanMadhab.Shafi;
  const times = new PrayerTimes(coordinates, date, params);
  return {
    fajr: times.fajr,
    sunrise: times.sunrise,
    dhuhr: times.dhuhr,
    asr: times.asr,
    maghrib: times.maghrib,
    isha: times.isha,
  };
}

export function computeQiblaDirection(lat: number, lng: number): number {
  return Qibla(new Coordinates(lat, lng));
}

export function formatPrayerTime(date: Date): string {
  return date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}
