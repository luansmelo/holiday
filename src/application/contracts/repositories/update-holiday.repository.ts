import { Injectable } from "@nestjs/common";
import { HolidayType } from "src/domain/enums/HolidayType";

export class UpdateHolidayModel {
    code: number;
    type: HolidayType
    name: string
    identifier: string

    constructor(code: number, type: HolidayType, name: string, identifier: string) {
        this.code = code
        this.type = type
        this.name = name
        this.identifier = identifier
    }
}

@Injectable()
export abstract class UpdateHolidayRepositoryContract {
    abstract update(holidayUpdate: Partial<UpdateHolidayModel>): Promise<void>;
}
