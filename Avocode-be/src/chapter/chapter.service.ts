import { CategoryRepository } from '@category/category.repository';
import { Category } from '@category/entities/category.entity';
import { LectureType } from '@common/enums';
import { ErrorType } from '@common/response/error.response';
import { LectureRepository } from '@lecture/lecture.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProblemRepository } from '@problem/problem.repository';
import { UserService } from '@user/user.service';
import { ChapterRepository } from './chapter.repository';

@Injectable()
export class ChapterService {
  constructor(
    @InjectRepository(ChapterRepository)
    private chapterRepository: ChapterRepository,

    @InjectRepository(LectureRepository)
    private lectureRepository: LectureRepository,

    @InjectRepository(ProblemRepository)
    private problemRepository: ProblemRepository,

    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,

    private userService: UserService,
  ) {}

  public async findWithCategory(
    user_id: string,
    category_id: number,
  ): Promise<any> {
    const category: Category = await this.categoryRepository.findOne({
      where: { id: category_id },
    });

    if (!category) {
      throw ErrorType.CATEGORY_NOT_FOUND();
    }

    const result = [];
    const allChapters = await this.chapterRepository.find({
      where: { category: { id: category_id } },
    });

    for (let i = 0; i < allChapters.length; ++i) {
      const lectures = await this.lectureRepository.find({
        where: { chapter: { id: allChapters[i].id } },
      });
      const lecture_list = [];

      for (let j = 0; j < lectures.length; ++j) {
        const completed = await this.userService.isCompleted(
          user_id,
          lectures[j].id,
        );

        lecture_list.push({
          lecture_id: lectures[j].id,
          lecture_type: LectureType.DOC,
          lecture_name: lectures[j].lecture_name,
          lecture_completed_state: completed.result,
          lecture_t_date: completed.completed_at,
        });
      }

      const problems = await this.problemRepository.find({
        where: { chapter: { id: allChapters[i].id } },
      });

      for (let j = 0; j < problems.length; ++j) {
        const solved = await this.userService.isSolved(user_id, problems[j].id);

        lecture_list.push({
          lecture_id: problems[j].id,
          lecture_type: LectureType.CODE,
          lecture_name: problems[j].title,
          lecture_completed_state: solved,
        });
      }

      result.push({
        chapter_id: allChapters[i].id,
        chapter_number: allChapters[i].chapter_no,
        chapter_name: allChapters[i].chapter_name,
        lecture_list: lecture_list,
      });
    }

    return {
      category_id: category.id,
      category_name: category.category_name,
      chapters: result,
    };
  }
}
