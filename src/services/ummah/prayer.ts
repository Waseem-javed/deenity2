import { UMMAH_INSTANCE } from "@/config";
import { MonthlyTimetableParams, PrayerParamsProps } from "../types/prayer";

export class PrayerService {
  /* ==========================
   * Prayer
   * ========================== */

  static getPrayerTimes(params: PrayerParamsProps) {
    return UMMAH_INSTANCE.get("/prayer-times", { params });
  }

  static async calcuateMethods() {
    return UMMAH_INSTANCE.get("/prayer-time/methods");
  }
  static async monthlyTimetabe(params: MonthlyTimetableParams) {
    return UMMAH_INSTANCE.get("/prayer-time/methods", { params });
  }
  static async ramadanTimetable() {
    return UMMAH_INSTANCE.get("/prayer-time/methods");
  }
}
