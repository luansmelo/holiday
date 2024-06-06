import { Injectable } from "@nestjs/common";

@Injectable()
export abstract class LoadHolidayServiceContract {
    abstract loadHoliday(ibgeCode: number, date: string): Promise<{ name: string }>;
}
