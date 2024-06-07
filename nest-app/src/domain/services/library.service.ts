import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Book } from '../entities/book.entity';
// import { Member } from '../entities/member.entity';
import { BookRepository } from '../repositories/book.repository';
import { MemberRepository } from '../repositories/member.repository';

@Injectable()
export class LibraryService {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly memberRepository: MemberRepository,
  ) {}

  async borrowBook(bookCode: string, memberCode: string): Promise<Book> {
    const book = await this.bookRepository.findByCode(bookCode);
    const member = await this.memberRepository.findByCode(memberCode);

    if (!book || !member) {
      throw new NotFoundException('Book or member not found.');
    }

    if (member.penalizedAt != null) {
      const penalty = member.penalizedAt;
      const currentDate = new Date();

      const msDiff = currentDate.getTime() - penalty.getTime();
      const daysDiff = Math.floor(msDiff / (1000 * 3600 * 24));

      if (daysDiff < 3) {
        throw new UnprocessableEntityException(
          "Currently You're penalized, cannot borrow a book for 3 days",
        );
      } else {
        member.penalty = false;
        member.penalizedAt = null;

        this.memberRepository.update(member);
      }
    }

    if (member.books.length >= 2) {
      throw new UnprocessableEntityException(
        'Member cannot borrow more than 2 books.',
      );
    }

    if (book.borrowedByMember || book.stock == 0) {
      throw new UnprocessableEntityException('Book is already borrowed.');
    }

    // Borrowing logic
    book.borrowedByMember = member.code;
    book.borrowedAt = new Date();
    book.returnedAt = null;
    member.books.push(book);

    return this.bookRepository.borrow(book);
  }

  async returnBook(bookCode: string, memberCode: string): Promise<Book> {
    const book = await this.bookRepository.findByCode(bookCode);
    const member = await this.memberRepository.findByCode(memberCode);

    if (!book) {
      throw new NotFoundException('Book not found or not borrowed.');
    }

    const borrowedDate = book.borrowedAt;
    const currentDate = new Date();

    const msDiff = currentDate.getTime() - borrowedDate.getTime();
    const daysDiff = Math.floor(msDiff / (1000 * 3600 * 24));

    if (daysDiff > 7) {
      member.penalty = true;
      member.penalizedAt = new Date();

      this.memberRepository.update(member);
    }

    book.borrowedByMember = null;
    book.borrowedAt = null;
    book.returnedAt = new Date();

    return this.bookRepository.return(book);
  }
}
