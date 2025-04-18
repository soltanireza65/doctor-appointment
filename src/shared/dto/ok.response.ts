import { ApiProperty } from '@nestjs/swagger';

export class OkResponse {
  @ApiProperty({ example: 'OK' })
  readonly message: string = 'OK';

  static from(message): OkResponse {
    return {
      message,
    };
  }
}
