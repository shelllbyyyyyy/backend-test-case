import { Injectable } from '@nestjs/common';

import { BookRepository } from '@/domain/repositories/book.repository';
import { Book } from '@/domain/entities/book.entity';
import { PrismaService } from '@/infrasturcture/persistence/prisma/prisma.service';
import { PrismaBookMapper } from '../mapper/prisma-book-mapper';

@Injectable()
export class PrismaBookRepository implements BookRepository {
  constructor(private prisma: PrismaService) {}

  async create(book: Book): Promise<Book> {
    const data = PrismaBookMapper.toPrisma(book);
    const entity = await this.prisma.book.create({ data });

    return PrismaBookMapper.toDomain(entity);
  }

  async findMany(): Promise<Book[]> {
    const books = await this.prisma.book.findMany({
      where: { borrowedBy: null },
    });

    return books.map((item) => PrismaBookMapper.toDomain(item));
  }

  async findByCode(bookCode: string): Promise<Book> {
    return await this.prisma.book.findUnique({
      where: { code: bookCode },
      include: { borrowedBy: true },
    });
  }

  async borrow(data: Book): Promise<Book> {
    const { code, borrowedByMember, borrowedAt, returnedAt } = data;

    return this.prisma.book.update({
      where: { code },
      data: {
        borrowedAt,
        returnedAt,
        borrowedBy: { connect: { code: borrowedByMember } },
        stock: { decrement: 1 },
      },
      include: {
        borrowedBy: true,
      },
    });
  }

  async return(data: Book): Promise<Book> {
    const { code, borrowedAt, returnedAt } = data;

    return this.prisma.book.update({
      where: { code },
      data: {
        borrowedAt,
        memberId: {
          set: null,
        },
        returnedAt,
        stock: { increment: 1 },
      },
      include: {
        borrowedBy: true,
      },
    });
  }
}
