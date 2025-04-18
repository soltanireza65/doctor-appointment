import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class InitSlotsRequestDto {
  @ApiProperty({ example: 'ad325e97-5a6d-4972-ab84-c83198c36c9a' })
  @IsUUID()
  @IsNotEmpty()
  doctorId: string;

  @ApiProperty({
    isArray: true,
    example: [
      '2025-04-18T10:00:00.000Z',
      '2025-04-18T10:30:00.000Z',
      '2025-04-18T11:00:00.000Z',
    ],
  })
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  slots: string[];
}
