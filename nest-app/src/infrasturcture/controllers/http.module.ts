import { Module } from '@nestjs/common';

import { BookService } from '@/domain/services/book.service';
import { MemberService } from '@/domain/services/member.service';
import { LibraryService } from '@/domain/services/library.service';

import { MemberController } from './member.controller';
import { BookController } from './book.controller';

@Module({
  imports: [],
  controllers: [MemberController, BookController],
  providers: [BookService, MemberService, LibraryService],
})
export class HttpModule {}
