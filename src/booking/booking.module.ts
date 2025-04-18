import { Module } from '@nestjs/common';
import { BookingFacade } from './application/facades/booking.facade';
import { BookingController } from './presenters/http/booking.controller';
import { DatabaseModule } from 'src/database/database.module';
import { BookingInfrastructureModule } from './infrastructure/booking.infrastructure-module';
import { ListFreeSlotsQueryHandler } from './application/queries/list-free-slots/list-free-slots.query-handler';
import { PrebookSlotCommandHandler } from './application/commands/pre-book-slot/pre-book-slot.command-handler';
import { BookSlotCommandHandler } from './application/commands/book-slot/book-slot.command-handler';
import { ExpirePrebookSlotCommandHandler } from './application/commands/expire-pre-book-slot/expire-pre-book-slot.command-handler';

@Module({
  imports: [BookingInfrastructureModule.use('prisma')],
  controllers: [BookingController],
  providers: [
    BookingFacade,
    ListFreeSlotsQueryHandler,
    PrebookSlotCommandHandler,
    BookSlotCommandHandler,
    ExpirePrebookSlotCommandHandler,
  ],
})
export class BookingModule {}
