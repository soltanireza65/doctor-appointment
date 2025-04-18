import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { DatabaseService } from 'src/database/database.service';
import { BookSlotCommand } from '../commands/book-slot/book-slot.command';
import { ExpirePrebookSlotCommand } from '../commands/expire-pre-book-slot/expire-pre-book-slot.command';
import { PrebookSlotCommand } from '../commands/pre-book-slot/pre-book-slot.command';
import { ListFreeSlotsQuery } from '../queries/list-free-slots/list-free-slots.query';

@Injectable()
export class BookingFacade {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  async listFreeSlots(query: ListFreeSlotsQuery) {
    return this.queryBus.execute(query);
  }

  async preBook(command: PrebookSlotCommand) {
    return this.commandBus.execute(command);
  }

  async book(command: BookSlotCommand) {
    return this.commandBus.execute(command);
  }

  async expirePrebook(slotId: string) {
    return this.commandBus.execute(new ExpirePrebookSlotCommand(slotId));
  }
}
