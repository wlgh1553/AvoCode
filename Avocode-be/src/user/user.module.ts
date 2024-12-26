import { CompletedLectureModule } from '@completedLecture/completed-lecture.module';
import { LectureModule } from '@lecture/lecture.module';
import { Module, forwardRef } from '@nestjs/common';
import { SubmissionModule } from '@submission/submission.module';
import { UserController } from '@user/user.controller';
import { UserRepository } from '@user/user.repository';
import { UserService } from '@user/user.service';

@Module({
  imports: [
    forwardRef(() => LectureModule),
    forwardRef(() => CompletedLectureModule),
    forwardRef(() => SubmissionModule),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
