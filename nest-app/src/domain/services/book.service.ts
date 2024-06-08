import { Injectable } from '@nestjs/common';

import { BookRepository } from '../repositories/book.repository';
import { Book } from '../entities/Book.entity';

interface BookProps {
  code: string;
  title: string;
  author: string;
  stock: number;
}

@Injectable()
export class BookService {
  constructor(private bookRepository: BookRepository) {}

  async create({ code, author, stock, title }: BookProps): Promise<Book> {
    const book = new Book(code, title, author, stock);

    const response = await this.bookRepository.create(book);

    return response;
  }

  async findMany(): Promise<Book[]> {
    const response = await this.bookRepository.findMany();

    return response;
  }

  async findByCode({ code }: { code: string }): Promise<Book> {
    const response = await this.bookRepository.findByCode(code);

    return response;
  }
}
