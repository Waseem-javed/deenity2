import { UMMAH_INSTANCE } from "@/config";

export class DuaService {
  /* ==========================
   * Duas
   * ========================== */

  static async getDuas() {
    return UMMAH_INSTANCE.get("/duas");
  }
  static async getDua(id: number | string) {
    return UMMAH_INSTANCE.get("/duas/categories");
  }
  static async getRandomDua() {
    return UMMAH_INSTANCE.get("duas/random");
  }
  static async getSearchDua() {
    return UMMAH_INSTANCE.get("duas/search");
  }
  static async getDuaByCategory(category: string) {
    return UMMAH_INSTANCE.get(`duas/category/${category}`);
  }
  static async getById(id: string) {
    return UMMAH_INSTANCE.get(`duas/${id}`);
  }
}
