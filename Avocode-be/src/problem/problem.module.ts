import { CategoryModule } from '@category/category.module';
import { CategoryRepository } from '@category/category.repository';
import { CategoryService } from '@category/category.service';
import { Module, forwardRef } from '@nestjs/common';
import { ProblemController } from '@problem/problem.controller';
import { ProblemRepository } from '@problem/problem.repository';
import { ProblemService } from '@problem/problem.service';
import { SubmissionModule } from '@submission/submission.module';
import { SubmissionRepository } from '@submission/submission.repository';
import { SubmissionService } from '@submission/submission.service';
import { TestcaseModule } from '@testcase/testcase.module';
import { TestcaseRepository } from '@testcase/testcase.repository';
import { TestcaseService } from '@testcase/testcase.service';
import { UserModule } from '@user/user.module';
import { UserRepository } from '@user/user.repository';
import { UserService } from '@user/user.service';

@Module({
  imports: [
    forwardRef(() => CategoryModule),
    forwardRef(() => SubmissionModule),
    forwardRef(() => UserModule),
    forwardRef(() => TestcaseModule),
  ],
  controllers: [ProblemController],
  providers: [ProblemService, ProblemRepository, CategoryService, CategoryRepository, SubmissionService, SubmissionRepository, UserService, UserRepository, TestcaseRepository, TestcaseService],
  exports: [ProblemService, ProblemRepository]
})
export class ProblemModule {}
