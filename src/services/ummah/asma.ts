import { UMMAH_INSTANCE } from "@/config";

export class AsmaService {
  static async getAllahNames() {
    return UMMAH_INSTANCE.get("/asma-ul-husna");
  }
  static async getSpecificName(number: number) {
    return UMMAH_INSTANCE.get(`/asma-ul-husna/${number}`);
  }
  static async getRandomName() {
    return UMMAH_INSTANCE.get("/asma-ul-husna/random");
  }
  static async getSearchName() {
    return UMMAH_INSTANCE.get("/asma-ul-husna/search");
  }
  static async getDailyRecite(day: number) {
    return UMMAH_INSTANCE.get(`/asma-ul-husna/daily/${day}`);
  }
}
