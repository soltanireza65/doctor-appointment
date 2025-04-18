import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { PrebookSlotCommand } from 'src/booking/application/commands/pre-book-slot/pre-book-slot.command';

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

  @ApiProperty({ example: '2025-04-18T10:00:00.000Z' })
  @IsString()
  @IsNotEmpty()
  time: string;

  toCommand(doctorId: string): PrebookSlotCommand {
    return new PrebookSlotCommand(doctorId, this.patientId, this.time);
  }
}
