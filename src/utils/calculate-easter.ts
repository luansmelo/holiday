import { HolidayType } from "../domain/enums/HolidayType";
import { formatDate } from "./date-utils";

export class HolidayUtils {
  static calculateEaster(year: number): Date {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const L = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * L) / 451);
    const month = Math.floor((h + L - 7 * m + 114) / 31);
    const day = 1 + (h + L - 7 * m + 114) % 31;
    return new Date(year, month - 1, day);
  }

  static calculateMovingHolidays(year: number) {
    const easter = HolidayUtils.calculateEaster(year);
    const easterTimestamp = easter.getTime();
    const carnaval = new Date(easterTimestamp - (47 * 24 * 60 * 60 * 1000));
    const sextaSanta = new Date(easterTimestamp - (2 * 24 * 60 * 60 * 1000));
    const corpusChristi = new Date(easterTimestamp + (60 * 24 * 60 * 60 * 1000));

    return [
      { name: 'Carnaval', moving_date: formatDate(carnaval), type: HolidayType.Movel },
      { name: 'Sexta-Feira Santa', moving_date: formatDate(sextaSanta), type: HolidayType.Nacional },
      { name: 'Corpus-Christi', moving_date: formatDate(corpusChristi), type: HolidayType.Nacional }
    ];
  }
}
