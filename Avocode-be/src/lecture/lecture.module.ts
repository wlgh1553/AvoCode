import { ChapterModule } from '@chapter/chapter.module';
import { CompletedLectureModule } from '@completedLecture/completed-lecture.module';
import { Module, forwardRef } from '@nestjs/common';
import { UserModule } from '@user/user.module';
import { LectureController } from './lecture.controller';
import { LectureRepository } from './lecture.repository';
import { LectureService } from './lecture.service';

@Module({
  imports: [
    forwardRef(() => ChapterModule),
    forwardRef(() => UserModule),
    forwardRef(() => CompletedLectureModule),
  ],
  controllers: [LectureController],
  providers: [LectureService, LectureRepository],
  exports: [LectureService, LectureRepository],
})
export class LectureModule {}
