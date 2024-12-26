import { CategoryList } from '@common/enums';
import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ProblemService } from '@problem/problem.service';

@Controller('problem')
export class ProblemController {
  constructor(private readonly problemService: ProblemService) {}

  @Get()
  async getListUsingCategory(
    @Query('category') categoryName: CategoryList,
  ): Promise<any> {
    return await this.problemService.findWithCategory(categoryName);
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: string): Promise<any> {
    return await this.problemService.findOneAndExamples(+id);
  }
}
