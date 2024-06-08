import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { CreateBookDTO } from './dto/create-book.dto';
import { LibraryService } from '@/domain/services/library.service';
import { Book } from '@/domain/entities/book.entity';
import { BookService } from '@/domain/services/book.service';
import { BorrowOrReturnBookDto } from './dto/borror-or-return-book.dto';
import { GetBookDto } from './dto/get-book.dto';

@Controller('/book')
@ApiTags('Books')
export class BookController {
  constructor(
    private bookService: BookService,
    private libraryService: LibraryService,
  ) {}

  @Get()
  @ApiCreatedResponse({
    description: 'Shows all books, borrowed books are not counted',
  })
  get() {
    return this.bookService.findMany();
  }

  @Get('/:code')
  @ApiBody({ type: GetBookDto })
  @ApiCreatedResponse({
    description: 'Shows a book',
  })
  getOne(@Param() params: GetBookDto): Promise<Book> {
    return this.bookService.findByCode(params);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The book has been successfully created',
  })
  async create(@Body() createBookDto: CreateBookDTO) {
    const response = this.bookService.create(createBookDto);
    return response;
  }

  @Post('/:code/borrow/:memberCode')
  @ApiBody({ type: BorrowOrReturnBookDto })
  @ApiCreatedResponse({
    description: 'The book has been successfully borrowed',
  })
  async borrowBook(@Param() params: BorrowOrReturnBookDto): Promise<Book> {
    return this.libraryService.borrowBook(params.bookCode, params.memberCode);
  }

  @Put('/:code/return/:memberCode')
  @ApiBody({ type: BorrowOrReturnBookDto })
  @ApiCreatedResponse({
    description: 'The book has been successfully returned',
  })
  async returnBook(@Param() params: BorrowOrReturnBookDto): Promise<Book> {
    return this.libraryService.returnBook(params.bookCode, params.memberCode);
  }
}
