import { HolidayType } from "../domain/enums/HolidayType";

export const FIXED_HOLIDAY = [
    { name: 'Ano Novo', fixed_date: '01/01', type: HolidayType.Nacional },
    { name: 'Tiradentes', fixed_date: '04/21', type: HolidayType.Nacional },
    { name: 'Dia do Trabalhador', fixed_date: '05/01', type: HolidayType.Nacional },
    { name: 'Independência', fixed_date: '09/07', type: HolidayType.Nacional },
    { name: 'Nossa Senhora Aparecida', fixed_date: '10/12', type: HolidayType.Nacional },
    { name: 'Finados', fixed_date: '11/02', type: HolidayType.Nacional },
    { name: 'Proclamação da República', fixed_date: '11/15', type: HolidayType.Nacional },
    { name: 'Natal', fixed_date: '12/25', type: HolidayType.Nacional },
];
