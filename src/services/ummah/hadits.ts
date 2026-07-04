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
    return UMMAH_INSTANCE.get("/hadith/search", { params: { q, collection, limit } });
  }

  static browseHadith({ collection, page, limit }: { collection: string; page: number; limit: number }) {
    return UMMAH_INSTANCE.get(`/hadith/${collection}`, { params: { page, limit } });
  }

  static specificHadith(params: { collection: string; number: number }) {
    return UMMAH_INSTANCE.get(`/hadith/${params.collection}/${params.number}`);
  }
}
