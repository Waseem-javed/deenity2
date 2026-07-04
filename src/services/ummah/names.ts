import { UMMAH_INSTANCE } from "@/config";

export class NamesSerivce {
  /* ==========================
   * Islamic Names
   * ========================== */

  static getBoyNames() {
    return UMMAH_INSTANCE.get("/names");
  }

  static getSearchName(query: string, limit: number) {
    return UMMAH_INSTANCE.get(`/names/search?q=${query}&limit=${limit}`);
  }

  static getRandomName() {
    return UMMAH_INSTANCE.get(`/names/random`);
  }
  static getNameById(id: string) {
    return UMMAH_INSTANCE.get(`/names/${id}`);
  }
}
