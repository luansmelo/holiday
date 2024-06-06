import { Injectable } from "@nestjs/common";
import { HolidayType } from "src/domain/enums/HolidayType";

export class AddHolidayModel {
    name: string
    date: string
    type: HolidayType
    municipality_code?: number;
    state_code?: number;
}

@Injectable()
export abstract class AddHolidayRepositoryContract {
    abstract save(addHoliday: AddHolidayModel): Promise<void>;
}
