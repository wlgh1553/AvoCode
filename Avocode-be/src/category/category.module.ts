import { CategoryController } from '@category/category.controller';
import { CategoryRepository } from '@category/category.repository';
import { CategoryService } from '@category/category.service';
import { Module, forwardRef } from '@nestjs/common';
import { ProblemModule } from '@problem/problem.module';
import { ProblemRepository } from '@problem/problem.repository';
import { ProblemService } from '@problem/problem.service';
import { SubmissionModule } from '@submission/submission.module';
import { SubmissionRepository } from '@submission/submission.repository';
import { SubmissionService } from '@submission/submission.service';
import { TestcaseModule } from '@testcase/testcase.module';
import { TestcaseRepository } from '@testcase/testcase.repository';
import { TestcaseService } from '@testcase/testcase.service';
import { UserModule } from '@user/user.module';

@Module({
  imports: [
    forwardRef(() => ProblemModule),
    forwardRef(() => SubmissionModule),
    forwardRef(() => UserModule),
    TestcaseModule,
  ],
  controllers: [CategoryController],
  providers: [
    CategoryService,
    CategoryRepository,
    ProblemService,
    ProblemRepository,
    SubmissionService,
    SubmissionRepository,
    TestcaseService,
    TestcaseRepository,
  ],
  exports: [CategoryService, CategoryRepository],
})
export class CategoryModule {}
