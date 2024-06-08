import { Injectable } from '@nestjs/common';

import { MemberRepository } from '..//repositories/member.repository';
import { Member } from '../entities/member.entity';

interface MemberProps {
  code: string;
  name: string;
}

@Injectable()
export class MemberService {
  constructor(private memberRepository: MemberRepository) {}

  async create({ name, code }: MemberProps): Promise<Member> {
    const user = new Member(code, name);

    const response = await this.memberRepository.create(user);

    return response;
  }

  async findMany(): Promise<Member[]> {
    const response = await this.memberRepository.findMany();

    return response;
  }

  async findByCode({ code }: { code: string }): Promise<Member> {
    const response = await this.memberRepository.findByCode(code);

    return response;
  }
}
