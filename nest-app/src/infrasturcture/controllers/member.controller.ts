import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { MemberService } from '@/domain/services/member.service';
import { CreateMemberDTO } from './dto/create-member.dto';
import { GetMemberDto } from './dto/get-member.dto';
import { Member } from '@/domain/entities/member.entity';

@Controller('/member')
@ApiTags('Member')
export class MemberController {
  constructor(private memberService: MemberService) {}

  @Get()
  @ApiCreatedResponse({
    description: 'Shows all member with count borrowed book',
  })
  get() {
    return this.memberService.findMany();
  }

  @Get('/:code')
  @ApiBody({ type: GetMemberDto })
  @ApiCreatedResponse({
    description: 'Shows a member',
  })
  getOne(@Param() params: GetMemberDto): Promise<Member> {
    return this.memberService.findByCode(params);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Created books successfully',
  })
  create(@Body() createMemberDto: CreateMemberDTO) {
    const response = this.memberService.create(createMemberDto);
    return response;
  }
}
