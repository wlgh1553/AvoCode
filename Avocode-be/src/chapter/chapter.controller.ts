import { ChapterService } from '@chapter/chapter.service';
import { Controller, Get, Query, Req } from '@nestjs/common';

@Controller('chapter')
export class ChapterController {
  constructor(private readonly chapterService: ChapterService) {}

  @Get()
  public async getListUsingCategory(
    @Req() request: any,
    @Query('id') category_id: number,
  ): Promise<any> {
    return await this.chapterService.findWithCategory(
      request.user.id,
      category_id,
    );
  }
}
