import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class InitSlotsRequestDto {
  @ApiProperty({ example: '1' })
  @IsString()
  @IsNotEmpty()
  doctorId: string;

  @ApiProperty({
    isArray: true,
    example: ['09:00', '09:30', '10:00', '10:30'],
  })
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  slots: string[];
}
