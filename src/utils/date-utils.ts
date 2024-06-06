import { BadRequestException } from '@nestjs/common';
import { isWeekend } from 'date-fns';

export function checkWeekend(date: string) {
    if (isWeekend(new Date(date))) {
        throw new BadRequestException('Holidays can only be created or updated for business days.');
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
