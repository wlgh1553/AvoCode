import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto<T> {
  @ApiProperty({ example: 200, description: 'Http Status Code' })
  statusCode: number;

  @ApiProperty({ description: 'Data' })
  data: T;

  constructor(data: T, statusCode: number = 200) {
    this.statusCode = statusCode;
    this.data = data;
  }
}