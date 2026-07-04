import { UMMAH_INSTANCE } from "@/config";

export class NamesService {
  /* ==========================
   * Islamic Names
   * ========================== */

  static getAllNames() {
    return UMMAH_INSTANCE.get("/names");
  }

  static getSearchName(query: string, limit: number) {
    return UMMAH_INSTANCE.get("/names/search", { params: { q: query, limit } });
  }

  static getRandomName() {
    return UMMAH_INSTANCE.get(`/names/random`);
  }
  static getNameById(id: string) {
    return UMMAH_INSTANCE.get(`/names/${id}`);
  }
}
