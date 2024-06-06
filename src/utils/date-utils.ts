import { BadRequestException } from '@nestjs/common';
import { isWeekend } from 'date-fns';

export function checkWeekend(date: string) {
    if (isWeekend(new Date(date))) {
        throw new BadRequestException('Feriados só podem ser criados ou atualizados para dias úteis.');
    }
}

export function formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export function isValidDate(dateString: string): boolean {
    const regExp = /^\d{4}-\d{2}-\d{2}$/;
    return regExp.test(dateString);
}
