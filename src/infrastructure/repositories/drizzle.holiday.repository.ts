import { Injectable } from '@nestjs/common';
import { db } from '../../config/drizzle.config';
import { and, eq, or } from 'drizzle-orm';
import { AddHolidayModel, AddHolidayRepositoryContract, DeleteHolidayRepositoryContract, LoadHolidayRepositoryContract, UpdateHolidayRepositoryContract } from 'src/application/contracts';
import { holidays, municipalities, states } from 'src/domain/entities/schema';
import { UpdateHolidayDto } from 'src/application/dtos/holiday/update-holiday.dto';
import { HolidayEntity } from 'src/domain/entities/holiday.entity';
import { HolidayType } from 'src/domain/enums/HolidayType';

@Injectable()
export class HolidayRepository implements AddHolidayRepositoryContract, LoadHolidayRepositoryContract, UpdateHolidayRepositoryContract, DeleteHolidayRepositoryContract {

    async loadHoliday(code: number, date: string): Promise<HolidayEntity | null> {
        const result = await db.select().from(holidays)
            .leftJoin(municipalities, eq(holidays.municipality_code, municipalities.ibge_code))
            .leftJoin(states, eq(holidays.state_code, states.ibge_code))
            .where(
                or(
                    and(
                        eq(holidays.municipality_code, code),
                        or(eq(holidays.fixed_date, date), eq(holidays.moving_date, date))
                    ),
                    and(
                        eq(holidays.state_code, code.toString().length === 7 ? parseInt(code.toString().slice(0, 2)) : code),
                        or(eq(holidays.fixed_date, date), eq(holidays.moving_date, date))
                    )
                )
            );

        if (!result.length) {
            return null;
        }

        return result[0] as unknown as HolidayEntity;
    }

    async save(holiday: AddHolidayModel): Promise<void> {
        await db.insert(holidays).values({ ...holiday, moving_date: holiday.date }).execute();
    }

    async update(holiday: UpdateHolidayDto): Promise<void> {
        await db.update(holidays)
            .set({ name: holiday.name })
            .where(
                or(
                    and(
                        eq(holidays.municipality_code, holiday.ibgeCode),
                        or(eq(holidays.fixed_date, holiday.date), eq(holidays.moving_date, holiday.date))
                    ),
                    and(
                        eq(holidays.state_code, holiday.ibgeCode),
                        or(eq(holidays.fixed_date, holiday.date), eq(holidays.moving_date, holiday.date))
                    )
                )
            );
    }

    async delete(ibgeCode: number, date: string, type: HolidayType): Promise<void> {
        console.log(ibgeCode, date, type)
        await db.delete(holidays)
            .where(
                (
                    or(
                        and(
                            eq(holidays.municipality_code, ibgeCode),
                            or(eq(holidays.fixed_date, date), eq(holidays.moving_date, date))
                        ),
                        and(
                            eq(holidays.state_code, ibgeCode),
                            or(eq(holidays.fixed_date, date), eq(holidays.moving_date, date))
                        )
                    ),
                    eq(holidays.type, type)
                )
            );
    }
}
