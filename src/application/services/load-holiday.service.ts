import { Injectable, NotFoundException } from '@nestjs/common';
import { checkWeekend } from 'src/utils/date-utils';
import { LoadHolidayRepositoryContract, LoadHolidayServiceContract } from '../contracts';

@Injectable()
export class LoadHolidayService implements LoadHolidayServiceContract {
    constructor(private readonly holidayLoad: LoadHolidayRepositoryContract) { }

    async loadHoliday(code: number, date: string): Promise<any> {

        checkWeekend(date)

        const holiday = await this.holidayLoad.loadHoliday(code, date)

        if (!holiday) {
            throw new NotFoundException("Holiday not found")
        }

        return {
            name: holiday.holidays.name
        }
    }
}
