import { ResponseDto } from '@common/response/response.format';
import { Body, Controller, Post, Request } from '@nestjs/common';
import { CreateTestcaseDto } from '@testcase/dto/create-testcase.dto';
import { TestcaseService } from '@testcase/testcase.service';

@Controller('testcase')
export class TestcaseController {
  constructor(private readonly testcaseService: TestcaseService) {}

  @Post()
  async create(
    @Request() req: any,
    @Body() createTestcaseDto: CreateTestcaseDto,
  ): Promise<ResponseDto<any>> {
    //TODO : 유저가 ADMIN이 맞는지 확인하는 로직 필요
    return new ResponseDto(
      await this.testcaseService.create(createTestcaseDto),
    );
  }
}
