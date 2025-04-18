import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BookSlotCommand } from './book-slot.command';
import { TimeSlotRepository } from '../../ports/time-slot.repository';
import { BookingStatusEnum } from 'src/booking/domain/enums/booking-status.enum';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(BookSlotCommand)
export class BookSlotCommandHandler implements ICommandHandler<BookSlotCommand, any> {
  constructor(
    private readonly timeSlotRepository: TimeSlotRepository, // DatabaseService
  ) {}

  async execute(command: BookSlotCommand): Promise<any> {
    const slot = await this.timeSlotRepository.findOne({
      where: {
        doctorId: command.doctorId,
        time: new Date(command.time),
      },
    });

    if (!slot) {
      throw new NotFoundException();
    }

    slot.book({ patientId: command.patientId });

    await this.timeSlotRepository.save(slot);

    return true;
  }
}
