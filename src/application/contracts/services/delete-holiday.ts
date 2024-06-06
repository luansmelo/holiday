import { Injectable } from "@nestjs/common";

@Injectable()
export abstract class DeleteHolidayServiceContract {
    abstract delete(ibgeCode: number, date: string): Promise<void>;
}
