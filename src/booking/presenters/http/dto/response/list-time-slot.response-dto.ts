import { Paginated } from 'src/shared/types/repository.type';
import { TimeSlotResponseDto } from './time-slot.response-dto';
import { TimeSlotModel } from 'src/booking/domain/models/time-slot.model';
import { ApiProperty } from '@nestjs/swagger';

export class ListTimeSlotResponseDto {
  @ApiProperty({
    type: TimeSlotResponseDto,
    isArray: true,
    description: 'List of time slots',
  })
  readonly items: TimeSlotResponseDto[];

  @ApiProperty({
    description: 'Total number of time slots',
  })
  readonly total: number;

  static from(data: Paginated<TimeSlotModel>): ListTimeSlotResponseDto {
    return {
      items: data.items.map((item) => TimeSlotResponseDto.from(item)),
      total: data.total,
    };
  }
}
