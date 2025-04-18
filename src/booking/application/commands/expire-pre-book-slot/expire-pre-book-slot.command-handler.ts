import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ExpirePrebookSlotCommand } from './expire-pre-book-slot.command';
import { TimeSlotRepository } from '../../ports/time-slot.repository';

@CommandHandler(ExpirePrebookSlotCommand)
export class ExpirePrebookSlotCommandHandler implements ICommandHandler<ExpirePrebookSlotCommand, any> {
  constructor(private readonly timeSlotRepository: TimeSlotRepository) {}

  async execute(command: ExpirePrebookSlotCommand): Promise<any> {
    const slot = await this.timeSlotRepository.findOne({
      where: {
        id: command.slotId,
      },
    });

    if (!slot) {
      return false;
    }

    slot.expire();

    await this.timeSlotRepository.save(slot);

    return true;
  }
}
