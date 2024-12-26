import { CategoryService } from '@category/category.service';
import { Category } from '@category/entities/category.entity';
import { CategoryList } from '@common/enums';
import { ErrorType } from '@common/response/error.response';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProblemRepository } from '@problem/problem.repository';
import { TestcaseService } from '@testcase/testcase.service';

@Injectable()
export class ProblemService {
  constructor(
    @InjectRepository(ProblemRepository)
    private problemRepository: ProblemRepository,

    @Inject(forwardRef(() => CategoryService))
    private categoryService: CategoryService,

    @Inject(forwardRef(() => TestcaseService))
    private testcaseService: TestcaseService,
  ) {}

  public async findWithCategory(categoryName: CategoryList): Promise<any> {
    const category: Category =
      await this.categoryService.getCategory(categoryName);

    if (!category) {
      throw ErrorType.CATEGORY_NOT_FOUND();
    }

    const problems = await this.problemRepository
      .createQueryBuilder('problem')
      .innerJoinAndSelect('problem.chapter', 'chapter')
      .innerJoinAndSelect('chapter.category', 'category')
      .where('category.category_name = :categoryName', {
        categoryName: category.category_name,
      })
      .getMany();

    return {
      category: category.category_name,
      problems: problems.map((problem) => {
        return {
          id: problem.id,
          title: problem.title,
          chapter: problem.chapter.chapter_name,
        };
      }),
    };
  }

  public async find(id: number): Promise<any> {
    const [problem, count] = await this.problemRepository.findAndCount({
      where: { id: id },
    });

    if (count === 0) throw ErrorType.PROBLEM_NOT_FOUND();

    return problem;
  }

  public findOne(id: number) {
    return this.problemRepository.findOne({ where: { id } });
  }

  public async findOneAndExamples(id: number) {
    const problem = await this.problemRepository.findOne({
      where: { id },
    });

    if (!problem) throw ErrorType.PROBLEM_NOT_FOUND();

    const testcases = await this.testcaseService.getThreeForExample(problem);
    return { ...problem, testcases };
  }
}
