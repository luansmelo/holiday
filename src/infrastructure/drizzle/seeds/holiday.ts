import { holidays as holidaysTable } from "../../../domain/entities/schema";
import { db } from "../../../config/drizzle.config";
import { HolidayUtils } from "../../../utils/calculate-easter";
import { FIXED_HOLIDAY } from "../../../config/constant";

export const seedHolidays = async (year: number) => {
    const movingHolidays = HolidayUtils.calculateMovingHolidays(year);

    for (const holiday of movingHolidays) {
        await db.insert(holidaysTable).values(holiday);
    }

    for (const holiday of FIXED_HOLIDAY) {
        await db.insert(holidaysTable).values(holiday);
    }

    console.log(`Inserção de feriados para o ano ${year} concluída.`);
};
