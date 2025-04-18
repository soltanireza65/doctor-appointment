import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ListSlotsRequestDto {
  @ApiProperty({ example: '1' })
  @IsString()
  @IsNotEmpty()
  doctorId: string;
}
