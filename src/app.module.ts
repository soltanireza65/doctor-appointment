import { Module } from '@nestjs/common';
import { DoctorModule } from './doctor/doctor.module';
import { BookingModule } from './booking/booking.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    CqrsModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        DATABASE_URL: Joi.string().required(),
      }),
    }),
    DoctorModule,
    BookingModule,
  ],
})
export class AppModule {}
