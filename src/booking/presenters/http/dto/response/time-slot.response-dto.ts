import { ApiProperty } from '@nestjs/swagger';
import { TimeSlotModel } from 'src/booking/domain/models/time-slot.model';

export class TimeSlotResponseDto {
  @ApiProperty()
  readonly id!: string;

  @ApiProperty()
  readonly time!: Date;

  static from(model: TimeSlotModel): TimeSlotResponseDto {
    return {
      id: model.id,
      time: model.time,
    };
  }
}
