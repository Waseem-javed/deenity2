import { UMMAH_INSTANCE } from "@/config";
import { MonthlyTimetableParams, PrayerParamsProps, RamadanTimetableParams } from "../types/prayer";

export class PrayerService {
  /* ==========================
   * Prayer
   * ========================== */

  static getPrayerTimes(params: PrayerParamsProps) {
    return UMMAH_INSTANCE.get("/prayer-times", { params });
  }

  static async calculationMethods() {
    return UMMAH_INSTANCE.get("/prayer-time/methods");
  }
  static async monthlyTimetable(params: MonthlyTimetableParams) {
    return UMMAH_INSTANCE.get("/prayer-times/monthly", { params });
  }
  static async ramadanTimetable(params: RamadanTimetableParams) {
    return UMMAH_INSTANCE.get("/prayer-times/ramadan", { params });
  }
}
