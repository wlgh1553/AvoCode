import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
} from '@nestjs/common';
import { CreateCompleteDto } from './dto/create-complete.dto';
import { LectureService } from './lecture.service';

@Controller('lecture')
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  @Post()
  async create(
    @Req() req: any,
    @Body() createCompleteDto: CreateCompleteDto,
  ): Promise<any> {
    return await this.lectureService.complete(
      req.user.id,
      createCompleteDto.lecture_id,
      createCompleteDto.quiz_user_answer,
    );
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: string): Promise<any> {
    return await this.lectureService.findOne(+id);
  }
}
