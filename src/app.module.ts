import { Module } from '@nestjs/common';
import { DoctorModule } from './doctor/doctor.module';
import { BookingModule } from './booking/booking.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
      }),
    }),
    DoctorModule,
    BookingModule,
  ],
})
export class AppModule {}
