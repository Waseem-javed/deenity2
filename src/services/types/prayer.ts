interface ICommon {
  lat: number;
  lng: number;
  method?: string;
  madhab: "Hanafi" | "Shafi";
  timezono: string;
}

export interface PrayerParamsProps extends ICommon {
  date: Date;
}

export interface MonthlyTimetableParams extends ICommon {
  month: number;
  year: number;
}

export interface RamadanTimetableParams extends ICommon {
  year: number;
}
