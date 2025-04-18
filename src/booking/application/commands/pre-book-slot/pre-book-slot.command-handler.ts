import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrebookSlotCommand } from './pre-book-slot.command';
import { TimeSlotRepository } from '../../ports/time-slot.repository';

@CommandHandler(PrebookSlotCommand)
export class PrebookSlotCommandHandler
  implements ICommandHandler<PrebookSlotCommand, any>
{
  constructor(
    private readonly timeSlotRepository: TimeSlotRepository, // DatabaseService
  ) {}

  async execute(command: PrebookSlotCommand): Promise<any> {
    const slot = await this.timeSlotRepository.findOne({
      where: {
        doctorId: command.doctorId,
        status: 'FREE',
        time: new Date(command.time),
      },
    });
    if (!slot) {
      return false;
    }

    slot.preBook({ patientId: command.patientId });

    await this.timeSlotRepository.save(slot);

    return true;
  }
}
