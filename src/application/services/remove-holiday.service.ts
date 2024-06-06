import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { HolidayType } from 'src/domain/enums/HolidayType';
import { getHolidayInfo, isValidDate, validateType } from 'src/utils';
import { DeleteHolidayRepositoryContract, DeleteHolidayServiceContract, LoadHolidayRepositoryContract } from '../contracts';

@Injectable()
export class DeleteHolidayService implements DeleteHolidayServiceContract {
    constructor(
        private readonly holidayDelete: DeleteHolidayRepositoryContract,
        private readonly holidayLoad: LoadHolidayRepositoryContract,
    ) { }

    async delete(code: number, date: string) {
        const type = validateType(code);

        const holidayInfo = getHolidayInfo(date);

        const [month, day] = date.split('-');
        const formattedDate = `${process.env.CURRENT_YEAR}-${month}-${day}`

        const effectiveDate = isValidDate(formattedDate) ? formattedDate : holidayInfo.date;

        const holiday = await this.holidayLoad.loadHoliday(code, effectiveDate);

        if (!holiday) {
            throw new NotFoundException("Holiday not found")
        }

        if (type === HolidayType.Municipal && holiday.holidays.type === HolidayType.Estadual) {
            throw new ForbiddenException("Cannot delete state holidays in a municipality");
        }

        if (holiday.holidays.type === HolidayType.Nacional && (holiday.holidays.municipality_code || holiday.holidays.state_code)) {
            throw new ForbiddenException("Cannot delete national holidays in a municipality or state");
        }

        await this.holidayDelete.delete(code, effectiveDate, holiday.type || holidayInfo.type);
    }
}
