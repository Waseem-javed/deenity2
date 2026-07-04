import { UMMAH_INSTANCE } from "@/config";
import { ZakatBody } from "../types/zakat";

export class ZakatService {
  static async zakatInfo() {
    return UMMAH_INSTANCE.get("/zakat/info");
  }

  static async zakatNisab() {
    return UMMAH_INSTANCE.get("/zakat/nisab");
  }

  static async zakatCalculate(body: ZakatBody) {
    return UMMAH_INSTANCE.post("/zakat/calculate", body);
  }

  static async zakatAgriculture(body: { value: number; water_source: string }) {
    return UMMAH_INSTANCE.post("/zakat/agriculture", body);
  }
}
