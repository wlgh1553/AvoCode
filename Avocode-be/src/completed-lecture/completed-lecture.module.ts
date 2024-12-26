import { ChapterModule } from '@chapter/chapter.module';
import { LectureModule } from '@lecture/lecture.module';
import { Module, forwardRef } from '@nestjs/common';
import { SubmissionModule } from '@submission/submission.module';
import { UserModule } from '@user/user.module';
import { CompletedLectureRepository } from './completed-lecture.repository';
import { CompletedLectureService } from './completed-lecture.service';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => SubmissionModule),
    forwardRef(() => ChapterModule),
    forwardRef(() => LectureModule),
  ],
  providers: [CompletedLectureService, CompletedLectureRepository],
  exports: [CompletedLectureService, CompletedLectureRepository],
})
export class CompletedLectureModule {}
