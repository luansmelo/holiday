import { formatDate, isValidDate } from 'src/utils';
import { FIXED_HOLIDAY } from 'src/config/constant';
import { HolidayUtils } from 'src/utils';
import { HolidayType } from 'src/domain/enums/HolidayType';

export interface HolidayInfo {
    name?: string,
    date: string,
    type?: HolidayType
}

export function getHolidayInfo(dateOrName: string, fallbackDate?: string): HolidayInfo {
    const year = Number(process.env.CURRENT_YEAR);
    const lowerCaseDateOrName = dateOrName.toLowerCase();

    const fixedHoliday = FIXED_HOLIDAY.find(holiday => holiday.name.toLowerCase() === lowerCaseDateOrName);
    if (fixedHoliday) {
        const holidayDate = formatDate(new Date(`${year}-${fixedHoliday.fixed_date}`));
        return { name: fixedHoliday.name, date: holidayDate, type: fixedHoliday.type };
    }

    const movingHoliday = HolidayUtils.calculateMovingHolidays(year)
        .find(holiday => holiday.name.toLowerCase() === lowerCaseDateOrName);
    if (movingHoliday) {
        return { name: movingHoliday.name, date: movingHoliday.moving_date, type: movingHoliday.type };
    }

    const isValid = isValidDate(dateOrName);
    if (isValid) {
        return { name: undefined, date: dateOrName, type: undefined };
    }

    const holidayDate = fallbackDate ? `${year}-${fallbackDate}` : `${year}-${dateOrName}`;
    return { name: undefined, date: holidayDate, type: undefined };
}
