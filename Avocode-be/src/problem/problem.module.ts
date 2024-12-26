import { CategoryModule } from '@category/category.module';
import { LectureModule } from '@lecture/lecture.module';
import { Module, forwardRef } from '@nestjs/common';
import { ProblemController } from '@problem/problem.controller';
import { ProblemRepository } from '@problem/problem.repository';
import { ProblemService } from '@problem/problem.service';
import { SubmissionModule } from '@submission/submission.module';
import { TestcaseModule } from '@testcase/testcase.module';
import { UserModule } from '@user/user.module';

@Module({
  imports: [
    forwardRef(() => CategoryModule),
    forwardRef(() => SubmissionModule),
    forwardRef(() => UserModule),
    forwardRef(() => TestcaseModule),
    forwardRef(() => LectureModule),
  ],
  controllers: [ProblemController],
  providers: [ProblemService, ProblemRepository],
  exports: [ProblemService, ProblemRepository],
})
export class ProblemModule {}
