import { Module } from '@nestjs/common';
import { TimeSlotRepository } from 'src/booking/application/ports/time-slot.repository';
import { DatabaseModule } from '../../../../database/database.module';
import { TimeSlotPrismaRepository } from './repositories/time-slot-prisma.repository';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: TimeSlotRepository,
      useClass: TimeSlotPrismaRepository,
    },
  ],
  exports: [TimeSlotRepository],
})
export class BookingPrismaPersistenceModule {}
