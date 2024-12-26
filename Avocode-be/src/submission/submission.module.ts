import { CategoryModule } from '@category/category.module';
import { LectureModule } from '@lecture/lecture.module';
import { Module, forwardRef } from '@nestjs/common';
import { ProblemModule } from '@problem/problem.module';
import { SubmissionController } from '@submission/submission.controller';
import { SubmissionRepository } from '@submission/submission.repository';
import { SubmissionService } from '@submission/submission.service';
import { TestcaseModule } from '@testcase/testcase.module';
import { UserModule } from '@user/user.module';

@Module({
  imports: [
    forwardRef(() => CategoryModule),
    forwardRef(() => ProblemModule),
    forwardRef(() => UserModule),
    forwardRef(() => TestcaseModule),
    forwardRef(() => LectureModule),
  ],
  controllers: [SubmissionController],
  providers: [SubmissionService, SubmissionRepository],
  exports: [SubmissionService, SubmissionRepository],
})
export class SubmissionModule {}
