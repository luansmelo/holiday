import { Provider } from "@nestjs/common";
import { AddHolidayRepositoryContract, DeleteHolidayRepositoryContract, LoadHolidayRepositoryContract, UpdateHolidayRepositoryContract } from "src/application/contracts";
import { AddHolidayServiceContract } from "src/application/contracts/services/add-holiday";
import { AddHolidayService } from "src/application/services/add-holiday.service";
import { HolidayRepository } from "src/infrastructure/repositories/drizzle.holiday.repository";
import { LoadHolidayServiceContract } from "../contracts/services/load-holiday";
import { LoadHolidayService } from "../services/load-holiday.service";
import { DeleteHolidayServiceContract } from "../contracts/services/delete-holiday";
import { DeleteHolidayService } from "../services/remove-holiday.service";

export const holidayProvider: Provider[] = [
    {
        provide: AddHolidayServiceContract,
        useClass: AddHolidayService
    },
    {
        provide: AddHolidayRepositoryContract,
        useClass: HolidayRepository
    },
    {
        provide: LoadHolidayRepositoryContract,
        useClass: HolidayRepository,
    },
    {
        provide: UpdateHolidayRepositoryContract,
        useClass: HolidayRepository
    },
    {
        provide: LoadHolidayServiceContract,
        useClass: LoadHolidayService
    },
    {
        provide: DeleteHolidayServiceContract,
        useClass: DeleteHolidayService
    },
    {
        provide: DeleteHolidayRepositoryContract,
        useClass: HolidayRepository
    },
]