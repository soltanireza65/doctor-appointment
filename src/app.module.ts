import { Module } from '@nestjs/common';
import { DoctorModule } from './doctor/doctor.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [DoctorModule, BookingModule],
})
export class AppModule {}
