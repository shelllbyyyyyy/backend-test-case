import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetMemberDto {
  @ApiProperty()
  @IsString()
  code: string;
}
