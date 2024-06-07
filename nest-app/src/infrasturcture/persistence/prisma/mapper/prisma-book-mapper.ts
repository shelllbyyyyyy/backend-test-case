import { Prisma, Book as PrismaBook } from '@prisma/client';

import { Book } from '@/domain/entities/book.entity';

export class PrismaBookMapper {
  static toDomain(entity: PrismaBook): Book {
    const model = new Book(
      entity.code,
      entity.title,
      entity.author,
      entity.stock,
      entity.memberId,
    );
    return model;
  }

  static toPrisma(book: Book): Prisma.BookUncheckedCreateInput {
    return {
      code: book.code,
      title: book.title,
      author: book.author,
      stock: book.stock,
    };
  }
}
