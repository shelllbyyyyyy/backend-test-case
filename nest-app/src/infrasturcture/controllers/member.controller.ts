import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { MemberService } from '@/domain/services/member.service';
import { CreateMemberDTO } from './dto/create-member.dto';

@Controller('/member')
@ApiTags('Member')
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Get()
  get() {
    return this.memberService.findMany();
  }

  @Post()
  create(@Body() createMemberDto: CreateMemberDTO) {
    const response = this.memberService.create(createMemberDto);
    return response;
  }
}
