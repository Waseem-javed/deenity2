import { UMMAH_INSTANCE } from "@/config";

export class QiblaService {
  /* ==========================
   * Qibla
   * ========================== */

  static getQibla(params: { lat: number; lng: number }) {
    return UMMAH_INSTANCE.get("/qibla", { params });
  }
}
