import { Module } from '@nestjs/common';
import { BookingFacade } from './application/facades/booking.facade';
import { BookingController } from './presenters/http/booking.controller';
import { BookingInfrastructureModule } from './infrastructure/booking.infrastructure-module';
import { ListFreeSlotsQueryHandler } from './application/queries/list-free-slots/list-free-slots.query-handler';
import { PrebookSlotCommandHandler } from './application/commands/pre-book-slot/pre-book-slot.command-handler';
import { BookSlotCommandHandler } from './application/commands/book-slot/book-slot.command-handler';
import { ExpirePrebookSlotCommandHandler } from './application/commands/expire-pre-book-slot/expire-pre-book-slot.command-handler';
import { BullModule } from '@nestjs/bullmq';
import { BOOKING_QUEUE } from './application/booking.constants';
import { ExpireTimeslotsJobProcessor } from './application/jobs/expire-time-slots/expire-time-slots.job-processor';
import { ExpireTimeslotsJob } from './application/jobs/expire-time-slots/expire-time-slots.job';

@Module({
  imports: [BookingInfrastructureModule.use('prisma'), BullModule.registerQueue({ name: BOOKING_QUEUE })],
  controllers: [BookingController],
  providers: [
    BookingFacade,
    ListFreeSlotsQueryHandler,
    PrebookSlotCommandHandler,
    BookSlotCommandHandler,
    ExpirePrebookSlotCommandHandler,
    ExpireTimeslotsJob,
    ExpireTimeslotsJobProcessor,
  ],
})
export class BookingModule {}
