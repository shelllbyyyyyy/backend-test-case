import { Member } from '@/domain/entities/member.entity';

export type MemberWithCountBook = Member & {
  borrowedBookCount?: number;
};

export abstract class MemberRepository {
  abstract findMany(): Promise<MemberWithCountBook[]>;
  abstract findByCode(memberCode: string): Promise<Member>;
  abstract create(data: Member): Promise<Member>;
  abstract update(data: Member): Promise<Member>;
}
