import { CategoryModule } from '@category/category.module';
import { LectureModule } from '@lecture/lecture.module';
import { Module, forwardRef } from '@nestjs/common';
import { ProblemModule } from '@problem/problem.module';
import { SubmissionModule } from '@submission/submission.module';
import { UserModule } from '@user/user.module';
import { ChapterController } from './chapter.controller';
import { ChapterRepository } from './chapter.repository';
import { ChapterService } from './chapter.service';

@Module({
  imports: [
    forwardRef(() => CategoryModule),
    forwardRef(() => LectureModule),
    forwardRef(() => ProblemModule),
    forwardRef(() => UserModule),
    forwardRef(() => SubmissionModule),
  ],
  controllers: [ChapterController],
  providers: [ChapterService, ChapterRepository],
  exports: [ChapterService, ChapterRepository],
})
export class ChapterModule {}
