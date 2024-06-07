import { Injectable } from '@nestjs/common';

import { MemberRepository } from '..//repositories/member.repository';
import { Member } from '../entities/member.entity';

interface CreateMemberProps {
  code: string;
  name: string;
}

@Injectable()
export class MemberService {
  constructor(private memberRepository: MemberRepository) {}

  async create({ name, code }: CreateMemberProps): Promise<Member> {
    const user = new Member(code, name);

    const response = await this.memberRepository.create(user);

    return response;
  }

  async findMany(): Promise<Member[]> {
    const response = await this.memberRepository.findMany();

    return response;
  }
}
