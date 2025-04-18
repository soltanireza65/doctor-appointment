import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class ListSlotsRequestDto {
  @ApiProperty({ example: 'ad325e97-5a6d-4972-ab84-c83198c36c9a' })
  @IsUUID()
  @IsNotEmpty()
  doctorId: string;
}
