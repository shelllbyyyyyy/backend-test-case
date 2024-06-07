import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { EnvModule } from '@/infrasturcture/env';

// Non exported
import { MemberRepository } from '@/domain/repositories/member.repository';
import { BookRepository } from '@/domain/repositories/book.repository';
import { PrismaMemberRepository } from './repositories/prisma-member.repository';
import { PrismaBookRepository } from './repositories/prisma-book.repository';

@Module({
  imports: [EnvModule],
  providers: [
    PrismaService,
    {
      provide: MemberRepository,
      useClass: PrismaMemberRepository,
    },
    {
      provide: BookRepository,
      useClass: PrismaBookRepository,
    },
  ],
  exports: [PrismaService, MemberRepository, BookRepository],
})
export class PrismaModule {}
