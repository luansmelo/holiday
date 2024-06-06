import { BadRequestException } from '@nestjs/common';
import { HolidayType } from 'src/domain/enums/HolidayType';

export function validateType(ibgeCode: number): HolidayType {
    const ibgeCodeLength = ibgeCode.toString().length;
    if (ibgeCodeLength === 7) {
        return HolidayType.Municipal;
    } else if (ibgeCodeLength === 2) {
        return HolidayType.Estadual;
    } else {
        throw new BadRequestException("Invalid IBGE code length");
    }
}