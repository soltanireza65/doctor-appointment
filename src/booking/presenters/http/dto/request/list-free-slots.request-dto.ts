import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { ListFreeSlotsQuery } from 'src/booking/application/queries/list-free-slots/list-free-slots.query';

export class ListFreeSlotsRequestDto {
  @ApiProperty({ example: 'ad325e97-5a6d-4972-ab84-c83198c36c9a' })
  @IsUUID()
  @IsNotEmpty()
  doctorId: string;

  toQuery(): ListFreeSlotsQuery {
    return new ListFreeSlotsQuery(this.doctorId);
  }
}
