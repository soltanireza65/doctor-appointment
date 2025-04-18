import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PrebookSlotRequestParamsDto {
  @ApiProperty({ example: '1' })
  @IsString()
  @IsNotEmpty()
  doctorId: string;
}

export class PrebookSlotRequestDto {
  @ApiProperty({ example: '1' })
  @IsString()
  @IsNotEmpty()
  patientId: string;

  @ApiProperty({ example: '09:00' })
  @IsString()
  @IsNotEmpty()
  time: string;
}
