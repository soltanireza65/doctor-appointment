import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class PrebookSlotRequestParamsDto {
  @ApiProperty({ example: 'ad325e97-5a6d-4972-ab84-c83198c36c9a' })
  @IsUUID()
  @IsNotEmpty()
  doctorId: string;
}

export class PrebookSlotRequestDto {
  @ApiProperty({ example: 'ad325e97-5a6d-4972-ab84-c83198c36c9a' })
  @IsUUID()
  @IsNotEmpty()
  patientId: string;

  @ApiProperty({ example: '09:00' })
  @IsString()
  @IsNotEmpty()
  time: string;
}
