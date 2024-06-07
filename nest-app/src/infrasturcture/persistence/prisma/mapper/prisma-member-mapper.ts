import { Prisma, Member as PrismaMember } from '@prisma/client';

import { Member } from '@/domain/entities/member.entity';

export class PrismaMemberMapper {
  static toDomain(entity: PrismaMember): Member {
    const model = new Member(entity.code, entity.name);
    return model;
  }

  static toPrisma(member: Member): Prisma.MemberUncheckedCreateInput {
    return {
      code: member.code,
      name: member.name,
    };
  }
}
