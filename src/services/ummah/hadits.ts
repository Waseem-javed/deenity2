import { UMMAH_INSTANCE } from "@/config";

export class HadithService {
  /* ==========================
   * Hadith
   * ========================== */

  static hadithCollections() {
    return UMMAH_INSTANCE.get("/hadith/collections");
  }

  static randomHadith() {
    return UMMAH_INSTANCE.get("/hadith/random");
  }

  static searchHadith(q: string, collection: string, limit: number) {
    return UMMAH_INSTANCE.get(`/hadith/search?q=${q}&${collection}&${limit}`);
  }

  static browseHadith(params: {
    collection: string;
    page: number;
    limit: number;
  }) {
    return UMMAH_INSTANCE.get("/haidth/", {
      params: { params },
    });
  }

  static specificHadith(params: { collection: string; number: number }) {
    return UMMAH_INSTANCE.get("randmo", { params });
  }
}
