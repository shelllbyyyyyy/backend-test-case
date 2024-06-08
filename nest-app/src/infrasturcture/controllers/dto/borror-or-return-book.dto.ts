import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class BorrowOrReturnBookDto {
  @ApiProperty()
  @IsString()
  bookCode: string;

  @ApiProperty()
  @IsString()
  memberCode: string;
}
