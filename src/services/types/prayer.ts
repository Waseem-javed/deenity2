interface ICommon {
  lat: number;
  lng: number;
  method?: string;
  madhab: "Hanafi" | "Shafi";
  timezone: string;
}

export interface PrayerParamsProps extends ICommon {
  /** YYYY-MM-DD */
  date: string;
}

export interface MonthlyTimetableParams extends ICommon {
  month: number;
  year: number;
}

export interface RamadanTimetableParams extends ICommon {
  year: number;
}
