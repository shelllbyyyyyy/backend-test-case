import { Injectable } from '@nestjs/common';

import { MemberRepository } from '@/domain/repositories/member.repository';
import { Member } from '@/domain/entities/member.entity';
import { PrismaService } from '@/infrasturcture/persistence/prisma/prisma.service';
import { PrismaMemberMapper } from '../mapper/prisma-member-mapper';

@Injectable()
export class PrismaMemberRepository implements MemberRepository {
  constructor(private prisma: PrismaService) {}

  async create(member: Member): Promise<Member> {
    const data = PrismaMemberMapper.toPrisma(member);
    const entity = await this.prisma.member.create({ data });

    return PrismaMemberMapper.toDomain(entity);
  }

  async findMany(): Promise<Member[]> {
    const members = await this.prisma.member.findMany({
      where: { penalty: false },
      include: {
        books: true,
      },
    });

    return members.map((item) => PrismaMemberMapper.toDomain(item));
  }

  async findByCode(bookCode: string): Promise<Member> {
    return await this.prisma.member.findUnique({
      where: {
        code: bookCode,
      },
      include: { books: true },
    });
  }

  async update(data: Member): Promise<Member> {
    const { code, penalizedAt, penalty } = data;

    return await this.prisma.member.update({
      where: { code },
      data: {
        penalty,
        penalizedAt,
      },
    });
  }
}
