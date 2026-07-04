// Base URL
export const BASE_URL = "https://ummahapi.com/api";

export const UMMAH_ENDPOINTS = {
  /* ==========================
   * Quran
   * ========================== */
  QURAN: "/quran",
  SURAHS: "/quran/surahs",
  SURAH: (id: number) => `/quran/surah/${id}`,
  AYAH: (surahId: number, ayahId: number) =>
    `/quran/surah/${surahId}/ayah/${ayahId}`,
  SEARCH_QURAN: "/quran/search",
  RANDOM_AYAH: "/quran/random",

  JUZ: (id: number) => `/quran/juz/${id}`,
  PAGE: (id: number) => `/quran/page/${id}`,

  RECITERS: "/quran/reciters",
  SURAH_AUDIO: (id: number) => `/quran/audio/${id}`,
  AYAH_AUDIO: (surahId: number, ayahId: number) =>
    `/quran/audio/${surahId}/${ayahId}`,

  SURAH_WORDS: (id: number) => `/quran/words/${id}`,
  AYAH_WORDS: (surahId: number, ayahId: number) =>
    `/quran/words/${surahId}/${ayahId}`,

  MUTASHABIHAT: "/quran/mutashabihat",
  RANDOM_MUTASHABIHAT: "/quran/mutashabihat/random",
  SURAH_MUTASHABIHAT: (id: number) => `/quran/mutashabihat/${id}`,
  AYAH_MUTASHABIHAT: (surahId: number, ayahId: number) =>
    `/quran/mutashabihat/${surahId}/${ayahId}`,

  SURAH_TAFSIR: (tafsir: string, surahId: number) =>
    `/quran/tafsir/${tafsir}/${surahId}`,
  AYAH_TAFSIR: (tafsir: string, surahId: number, ayahId: number) =>
    `/quran/tafsir/${tafsir}/${surahId}/${ayahId}`,

  /* ==========================
   * Hadith
   * ========================== */
  HADITH: "/hadith",
  HADITH_BOOKS: "/hadith/books",
  HADITH_BOOK: (book: number) => `/hadith/${book}`,
  HADITH_CHAPTER: (book: number, chapter: number) =>
    `/hadith/${book}/chapter/${chapter}`,
  HADITH_NUMBER: (book: number, number: number) => `/hadith/${book}/${number}`,
  RANDOM_HADITH: "/hadith/random",
  SEARCH_HADITH: "/hadith/search",

  /* ==========================
   * Duas
   * ========================== */
  DUAS: "/duas",
  DUA_CATEGORIES: "/duas/categories",
  DUA_CATEGORY: (id: number) => `/duas/category/${id}`,
  DUA: (id: number) => `/duas/${id}`,
  RANDOM_DUA: "/duas/random",
  SEARCH_DUA: "/duas/search",

  /* ==========================
   * Prayer Times
   * ========================== */
  PRAYER: "/prayer",
  PRAYER_TIMES: "/prayer/times",
  MONTHLY_PRAYER: "/prayer/monthly",
  PRAYER_CALENDAR: "/prayer/calendar",

  /* ==========================
   * Qibla
   * ========================== */
  QIBLA: "/qibla",

  /* ==========================
   * 99 Names of Allah
   * ========================== */
  ALLAH_NAMES: "/allah-names",
  ALLAH_NAME: (id: number) => `/allah-names/${id}`,

  /* ==========================
   * Islamic Names
   * ========================== */
  ISLAMIC_NAMES: "/names",
  BOY_NAMES: "/names/boys",
  GIRL_NAMES: "/names/girls",
  NAME_DETAILS: (name: string) => `/names/${name}`,
  SEARCH_NAMES: "/names/search",

  /* ==========================
   * Hijri Calendar
   * ========================== */
  HIJRI: "/hijri",
  HIJRI_DATE: "/hijri/date",
  HIJRI_MONTHS: "/hijri/months",

  /* ==========================
   * Islamic Events
   * ========================== */
  EVENTS: "/events",
  EVENT: (id: number) => `/events/${id}`,
};
