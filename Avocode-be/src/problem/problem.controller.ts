import { CategoryList } from '@common/enums';
import { ResponseDto } from '@common/response/response.format';
import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ProblemService } from '@problem/problem.service';

@Controller('problem')
export class ProblemController {
  constructor(private readonly problemService: ProblemService) {}

  @Get()
  async getAll(
    @Query('category') categoryName: CategoryList,
  ): Promise<ResponseDto<any>> {
    return new ResponseDto(
      await this.problemService.findWithCategory(categoryName),
    );
  }

  @Get(':id')
  async getOne(
    @Param('id', ParseIntPipe) id: string,
  ): Promise<ResponseDto<any>> {
    return new ResponseDto(await this.problemService.findOneAndExamples(+id));
  }
}
