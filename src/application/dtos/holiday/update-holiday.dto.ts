import { AddHolidayDto } from "./add-holiday.dto";
import { PartialType } from '@nestjs/swagger';

export class UpdateHolidayDto extends PartialType(AddHolidayDto) { } 