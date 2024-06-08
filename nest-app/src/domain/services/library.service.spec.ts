import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { LibraryService } from './library.service';
import { BookRepository } from '../repositories/book.repository';
import { MemberRepository } from '../repositories/member.repository';
import { mockMembers } from '../../mock/mock.member';
import { mockBooks } from '../../mock/mock.book';

describe('Use Case', () => {
  let libraryService: LibraryService;
  let bookRepository: BookRepository;
  let memberRepository: MemberRepository;

  const mockMemberRepository = {
    findMany: jest.fn().mockResolvedValue([]),
    create: jest.fn().mockResolvedValue(mockMembers[0]),
    findByCode: jest.fn().mockImplementation(({ code }) => {
      const member = mockMembers.find((member) => member.code === code);
      if (!member) return null;
      return member;
    }),
    update: jest.fn(),
  };

  const mockBookRepository = {
    findMany: jest.fn().mockResolvedValue(mockBooks),
    create: jest.fn().mockResolvedValue(mockBooks[0]),
    findByCode: jest.fn().mockImplementation(({ code }) => {
      const book = mockBooks.find((book) => book.code === code);
      if (!book) return null;
      return book;
    }),
    borrow: jest.fn(),
    return: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LibraryService,
        {
          provide: BookRepository,
          useValue: mockBookRepository,
        },
        {
          provide: MemberRepository,
          useValue: mockMemberRepository,
        },
      ],
    }).compile();

    libraryService = module.get<LibraryService>(LibraryService);
    bookRepository = module.get<BookRepository>(BookRepository);
    memberRepository = module.get<MemberRepository>(MemberRepository);
  });

  it('should be defined', () => {
    expect(libraryService).toBeDefined();
    expect(bookRepository).toBeDefined();
    expect(memberRepository).toBeDefined();
  });

  describe('Member check', () => {
    it('should show member and count book that being borrowed', async () => {
      const members = mockMembers.map((member) => ({ ...member }));
      const books = mockBooks.map((book) => ({ ...book }));
      members[0].books.push(books[0], books[1]);
      members[2].books.push(books[2]);

      const newMember = members.map((member) => ({
        ...member,
        count: member.books.length,
      }));

      jest
        .spyOn(memberRepository, 'findMany')
        .mockImplementation(() => Promise.resolve(newMember));

      const result = await memberRepository.findMany();

      expect(result).toEqual(newMember);
    });

    jest.restoreAllMocks();
  });

  describe('Check the book', () => {
    it('should show books and books that are being borrowed are not counted', async () => {
      const books = mockBooks.map((book) => ({ ...book }));
      books[0].stock = 0;
      books[1].stock = 0;
      books[2].stock = 0;

      const newBooks = books.filter((book) => book.stock > 0);
      jest
        .spyOn(bookRepository, 'findMany')
        .mockImplementation(() => Promise.resolve(newBooks));

      const result = await bookRepository.findMany();
      expect(result).toEqual(newBooks);
    });

    jest.restoreAllMocks();
  });

  describe('borrowBook', () => {
    it('should throw NotFoundException if book or member is not found', async () => {
      jest.spyOn(bookRepository, 'findByCode').mockResolvedValue(undefined);
      jest.spyOn(memberRepository, 'findByCode').mockResolvedValue(undefined);

      await expect(
        libraryService.borrowBook('nonexistentBook', 'nonexistentMember'),
      ).rejects.toThrow(new NotFoundException('Book or member not found.'));
    });

    it('should throw UnprocessableEntityException if the books is already borrowed by other member', async () => {
      const members = mockMembers.map((member) => ({ ...member }));
      const books = mockBooks.map((book) => ({ ...book }));

      members[0].books.push(books[0], books[1]);
      books[0].stock -= 1;
      books[1].stock -= 1;
      books[0].borrowedAt = new Date();
      books[1].borrowedAt = new Date();
      books[0].borrowedBy = members[0].code;
      books[1].borrowedBy = members[0].code;

      jest.spyOn(bookRepository, 'findByCode').mockResolvedValue(books[0]);
      jest.spyOn(memberRepository, 'findByCode').mockResolvedValue(members[1]);

      await expect(
        libraryService.borrowBook(books[0].code, members[1].code),
      ).rejects.toThrow(
        new UnprocessableEntityException('Book is already borrowed.'),
      );
    });

    it('should throw UnprocessableEntityException if member borrow more than 2 books', async () => {
      const members = mockMembers.map((member) => ({ ...member }));
      const books = mockBooks.map((book) => ({ ...book }));

      members[0].books.push(books[0], books[1]);
      books[0].borrowedAt = new Date();
      books[1].borrowedAt = new Date();
      books[0].borrowedBy = members[0].code;
      books[1].borrowedBy = members[0].code;

      const newMember = members.map((member) => ({
        ...member,
        count: member.books.length,
      }));

      jest.spyOn(bookRepository, 'findByCode').mockResolvedValue(books[2]);
      jest
        .spyOn(memberRepository, 'findByCode')
        .mockResolvedValue(newMember[0]);

      await expect(
        libraryService.borrowBook(books[2].code, newMember[0].code),
      ).rejects.toThrow(
        new UnprocessableEntityException(
          'Member cannot borrow more than 2 books.',
        ),
      );
    });

    it('should throw UnprocessableEntityException if member is being penalized', async () => {
      const members = mockMembers.map((member) => ({ ...member }));
      const books = mockBooks.map((book) => ({ ...book }));

      members[0].penalizedAt = new Date();

      jest.spyOn(bookRepository, 'findByCode').mockResolvedValue(books[0]);
      jest.spyOn(memberRepository, 'findByCode').mockResolvedValue(members[0]);

      await expect(
        libraryService.borrowBook(books[0].code, members[0].code),
      ).rejects.toThrow(
        new UnprocessableEntityException(
          "Currently You're penalized, cannot borrow a book for 3 days",
        ),
      );
    });
  });

  describe('returnBook', () => {
    it('should return book success', async () => {
      const members = mockMembers.map((member) => ({ ...member }));
      const books = mockBooks.map((book) => ({ ...book }));

      members[0].books.push(books[0]);
      books[0].stock -= 1;
      books[0].borrowedAt = new Date();
      books[0].borrowedBy = members[0].code;

      jest.spyOn(bookRepository, 'findByCode').mockResolvedValue(books[0]);
      jest.spyOn(memberRepository, 'findByCode').mockResolvedValue(members[0]);

      await expect(
        libraryService.returnBook(books[0].code, members[0].code),
      ).resolves.not.toThrow();
    });

    it('should return book success and penalized the member who borrow it', async () => {
      const members = mockMembers.map((member) => ({ ...member }));
      const books = mockBooks.map((book) => ({ ...book }));

      members[0].books.push(books[0]);
      books[0].stock -= 1;
      books[0].borrowedAt = new Date('2024-05-31T06:46:00.859Z');
      books[0].borrowedBy = members[0].code;

      jest.spyOn(bookRepository, 'findByCode').mockResolvedValue(books[0]);
      jest.spyOn(memberRepository, 'findByCode').mockResolvedValue(members[0]);

      await expect(
        libraryService.returnBook(books[0].code, members[0].code),
      ).rejects.toThrow(
        new Error(
          'Member is penalized for returning the book late. You cannot borrow book for 3 days',
        ),
      );
    });
  });
});
