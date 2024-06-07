import { Member } from '@/domain/entities/member.entity';

export abstract class MemberRepository {
  abstract findMany(): Promise<Member[]>;
  abstract findByCode(memberCode: string): Promise<Member>;
  abstract create(data: Member): Promise<Member>;
  abstract update(data: Member): Promise<Member>;
}
