import { Controller, Get, Put, Delete, Param, Body, HttpCode, BadRequestException } from '@nestjs/common';
import { isDate, validate } from 'class-validator';
import { AddHolidayServiceContract } from 'src/application/contracts/services/add-holiday';
import { DeleteHolidayServiceContract } from 'src/application/contracts/services/delete-holiday';
import { LoadHolidayServiceContract } from 'src/application/contracts/services/load-holiday';
import { AddHolidayDto } from 'src/application/dtos/holiday/add-holiday.dto';
import { isValidDate } from 'src/utils';

@Controller('feriados')
export class HolidayController {
    constructor(
        private readonly addHoliday: AddHolidayServiceContract,
        private readonly holidayLoad: LoadHolidayServiceContract,
        private readonly holidayDelete: DeleteHolidayServiceContract,
    ) { }

    @Put(':ibgeCode/:date')
    async create(
        @Param('ibgeCode') ibgeCode: number,
        @Param('date') date: string,
        @Body() body: any,
    ) {

        const name = body?.name ? body.name : date;
        const addHolidayDto = new AddHolidayDto();

        addHolidayDto.ibgeCode = ibgeCode;
        addHolidayDto.date = date;
        addHolidayDto.name = name;

        const errors = await validate(addHolidayDto);

        if (errors.length > 0) {
            throw new BadRequestException(errors);
        }

        await this.addHoliday.create(addHolidayDto);
    }

    @Get(':ibgeCode/:date')
    async getHoliday(
        @Param('ibgeCode') ibgeCode: number,
        @Param('date') date: string,
    ) {
        return await this.holidayLoad.loadHoliday(ibgeCode, date);
    }

    @Delete(':ibgeCode/:date')
    @HttpCode(204)
    async deleteHoliday(
        @Param('ibgeCode') ibgeCode: number,
        @Param('date') date: string,
    ) {
        return await this.holidayDelete.delete(ibgeCode, date);
    }
}
