import { Book } from '@/domain/entities/book.entity';

export abstract class BookRepository {
  abstract findMany(): Promise<Book[]>;
  abstract findByCode(bookCode: string): Promise<Book>;
  abstract create(data: Book): Promise<Book>;
  abstract borrow(data: Book): Promise<Book>;
  abstract return(data: Book): Promise<Book>;
}
