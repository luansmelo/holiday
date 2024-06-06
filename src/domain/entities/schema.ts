import { integer, pgEnum, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const holidayEnum = pgEnum('type', ['nacional', 'estadual', 'municipal', 'movel']);

export const states = pgTable('states', {
    ibge_code: integer('code').primaryKey(),
    name: text('name')
});

export const holidays = pgTable('holidays', {
    id: serial('id').primaryKey(),
    name: text('name'),
    fixed_date: text('fixed_date'),
    type: holidayEnum('type').notNull(),
    municipality_code: integer('municipality_code').references(() => municipalities.ibge_code),
    state_code: integer('state_code').references(() => states.ibge_code),
    moving_date: text('moving_date')
});

export const municipalities = pgTable('municipalities', {
    ibge_code: integer('ibge_code').primaryKey(),
    name: text('name'),
    state_code: integer('state_code').references(() => states.ibge_code)
});
