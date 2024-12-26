import { CategoryRepository } from '@category/category.repository';
import { CategoryList } from '@common/enums';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProblemService } from '@problem/problem.service';
import { SubmissionService } from '@submission/submission.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,

    @Inject(forwardRef(() => ProblemService))
    private problemService: ProblemService,

    @Inject(forwardRef(() => SubmissionService))
    private submissionService: SubmissionService,
  ) {}

  public async getCategory(category: CategoryList): Promise<any> {
    return await this.categoryRepository.findOne({
      where: { category_name: category },
    });
  }

  public async getAll(user_id: string): Promise<any> {
    const categories = await this.categoryRepository.find();

    const result = [];

    for (const i in categories) {
      const category_id = categories[i].id;
      const category_name = categories[i].category_name;
      const problem_list =
        await this.problemService.findWithCategory(category_name);

      const problems = problem_list.problems;

      let count = 0;

      for (const j in problems) {
        const correct = await this.submissionService.isCorrectSubmissionExists(
          user_id,
          problems[j].id,
        );

        if (correct) count += 1;
      }

      result.push({
        category_id: category_id,
        category_name: category_name,
        data: { total: problems.length, solved: count },
      });
    }

    return result;
  }
}
