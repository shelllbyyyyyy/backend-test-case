import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetBookDto {
  @ApiProperty()
  @IsString()
  code: string;
}
