import { Injectable } from "@nestjs/common";

@Injectable()
export abstract class LoadHolidayRepositoryContract {
    abstract loadHoliday(ibgeCode: number, date: string): Promise<any>;
}
