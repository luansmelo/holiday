import { Injectable } from '@nestjs/common';
import { AddHolidayRepositoryContract, AddHolidayServiceContract, LoadHolidayRepositoryContract, UpdateHolidayRepositoryContract } from '../contracts';
import { HolidayType } from 'src/domain/enums/HolidayType';
import { checkWeekend, getHolidayInfo, validateType, isValidDate, HolidayInfo } from 'src/utils';
import { AddHolidayDto } from '../dtos';

@Injectable()
export class AddHolidayService implements AddHolidayServiceContract {

    constructor(
        private readonly holidayRepo: AddHolidayRepositoryContract,
        private readonly holidayLoad: LoadHolidayRepositoryContract,
        private readonly holidayUpdate: UpdateHolidayRepositoryContract
    ) { }

    async create(addHoliday: AddHolidayDto): Promise<void> {
        const { ibgeCode, date, name } = addHoliday;

        let holidayInfo: HolidayInfo;
        if (isValidDate(date)) {
            const tempHolidayInfo = getHolidayInfo(name);
            holidayInfo = { name: tempHolidayInfo.name ?? name, date, type: tempHolidayInfo.type };
        } else {
            holidayInfo = getHolidayInfo(date || name, addHoliday.date);
        }

        const holidayType = validateType(ibgeCode);

        checkWeekend(holidayInfo.date);

        const holiday = {
            type: holidayInfo.type ?? holidayType,
            name: holidayInfo.name ?? name,
            date: holidayInfo.date,
            municipality_code: undefined,
            state_code: undefined
        };

        const effectiveType = holiday.type === HolidayType.Movel ? holidayType : holiday.type;

        if (effectiveType === HolidayType.Municipal || effectiveType === HolidayType.Nacional) {
            holiday.municipality_code = ibgeCode;
        } else if (effectiveType === HolidayType.Estadual) {
            holiday.state_code = ibgeCode;
        }

        const existingHoliday = await this.holidayLoad.loadHoliday(ibgeCode, holidayInfo.date);

        if (!existingHoliday) {
            await this.holidayRepo.save(holiday);
        } else {
            await this.holidayUpdate.update(holiday);
        }
    }
}
