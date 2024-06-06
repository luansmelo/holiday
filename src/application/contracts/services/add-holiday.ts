import { Injectable } from "@nestjs/common";
import { AddHolidayDto } from "src/application/dtos/holiday/add-holiday.dto";

@Injectable()
export abstract class AddHolidayServiceContract {
    abstract create(addHoliday: AddHolidayDto): Promise<void>;
}
