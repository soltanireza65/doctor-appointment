import { BookSlotCommand } from 'src/booking/application/commands/book-slot/book-slot.command';
import {
  PrebookSlotRequestDto,
  PrebookSlotRequestParamsDto,
} from './prebook-slot.request-dto';

export class BookSlotRequestParamsDto extends PrebookSlotRequestParamsDto {}

export class BookSlotRequestDto extends PrebookSlotRequestDto {
  toCommand(doctorId: string): BookSlotCommand {
    return new BookSlotCommand(doctorId, this.patientId, this.time);
  }
}
