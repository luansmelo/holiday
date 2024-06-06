import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HolidayController } from './presentation/controllers/holiday.controller';
import { holidayProvider } from './application/providers/holiday.providers';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [HolidayController],
  providers: [
    ...holidayProvider
  ],
})
export class AppModule { }
