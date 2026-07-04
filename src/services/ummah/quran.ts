import { UMMAH_INSTANCE } from "@/config";

export class QuranService {
  static async QuranOverview() {
    return UMMAH_INSTANCE.get("/quran");
  }

  static async ListSurahs() {
    return UMMAH_INSTANCE.get("/quran/surahs");
  }

  static async GetFullSurah(surahNumber: number) {
    return UMMAH_INSTANCE.get(`/quran/surah/${surahNumber}`);
  }

  static async GetSpecficAyah(surahNumber: number, ayahNumber: number) {
    return UMMAH_INSTANCE.get(`/quran/surah/${surahNumber}/ayah/${ayahNumber}`);
  }

  static async GetJuz(juzNumber: number) {
    return UMMAH_INSTANCE.get(`/quran/juz/${juzNumber}`);
  }

  static async GetMushafPage(number: number) {
    return UMMAH_INSTANCE.get(`/quran/page/${number}`);
  }

  static async GetReciters() {
    return UMMAH_INSTANCE.get("/quran/reciters");
  }

  static async ReciterAudio(surahNumber: number, reciterId?: number) {
    return UMMAH_INSTANCE.get(`/quran/audio/${surahNumber}`, { params: { reciter: reciterId } });
  }

  static async AyahAudio(surahNumber: number, ayahNumber: number) {
    return UMMAH_INSTANCE.get(`/quran/audio/${surahNumber}/${ayahNumber}`);
  }
}
