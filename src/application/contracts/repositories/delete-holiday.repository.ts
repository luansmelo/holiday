import { Injectable } from "@nestjs/common";
import { HolidayType } from "src/domain/enums/HolidayType";

@Injectable()
export abstract class DeleteHolidayRepositoryContract {
    abstract delete(ibgeCode: number, date: string, type: HolidayType): Promise<void>;
}
