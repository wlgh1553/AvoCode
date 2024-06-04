import { CategoryModule } from '@category/category.module';
import { CategoryRepository } from '@category/category.repository';
import { CategoryService } from '@category/category.service';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProblemModule } from '@problem/problem.module';
import { ProblemRepository } from '@problem/problem.repository';
import { ProblemService } from '@problem/problem.service';
import { Submission } from '@submission/entities/submission.entity';
import { SubmissionController } from '@submission/submission.controller';
import { SubmissionRepository } from '@submission/submission.repository';
import { SubmissionService } from '@submission/submission.service';
import { TestcaseModule } from '@testcase/testcase.module';
import { UserModule } from '@user/user.module';
import { UserRepository } from '@user/user.repository';
import { UserService } from '@user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Submission]),
    forwardRef(() => CategoryModule),
    forwardRef(() => ProblemModule),
    UserModule,
    TestcaseModule,
  ],
  controllers: [SubmissionController],
  providers: [SubmissionService, SubmissionRepository, UserService, UserRepository, ProblemService, ProblemRepository, CategoryRepository, CategoryService],
  exports: [SubmissionService, SubmissionRepository],
})
export class SubmissionModule { }
