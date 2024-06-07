import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateBookDTO } from './dto/create-book.dto';
import { LibraryService } from '@/domain/services/library.service';
import { Book } from '@/domain/entities/book.entity';
import { BookService } from '@/domain/services/book.service';

@Controller('/book')
@ApiTags('Book')
export class BookController {
  constructor(
    private bookService: BookService,
    private libraryService: LibraryService,
  ) {}

  @Get()
  get() {
    return this.bookService.findMany();
  }

  @Post()
  create(@Body() createBookDto: CreateBookDTO) {
    const response = this.bookService.create(createBookDto);
    return response;
  }

  @Post('/:code/borrow/:memberCode')
  async borrowBook(
    @Param('code') code: string,
    @Param('memberCode') memberCode: string,
  ): Promise<Book> {
    return this.libraryService.borrowBook(code, memberCode);
  }

  @Put('/:code/return/:memberCode')
  async returnBook(
    @Param('code') code: string,
    @Param('memberCode') memberCode: string,
  ): Promise<Book> {
    return this.libraryService.returnBook(code, memberCode);
  }
}
