import { TestCaseType } from '@common/enums';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Problem } from '@problem/entities/problem.entity';
import { CreateTestcaseDto } from '@testcase/dto/create-testcase.dto';
import { TestcaseRepository } from '@testcase/testcase.repository';

@Injectable()
export class TestcaseService {
  constructor(
    @InjectRepository(TestcaseRepository)
    private testcaseRepository: TestcaseRepository,
  ) {}

  public async create(createTestcaseDto: CreateTestcaseDto): Promise<any> {
    const testcase = await this.testcaseRepository.create(createTestcaseDto);
    return await this.testcaseRepository.save(testcase);
  }

  public async findAllByProblem(problem: Problem, type: TestCaseType) {
    return await this.testcaseRepository.find({
      where: {
        problem,
        type,
      },
    });
  }

  public async getThreeForExample(problem: Problem) {
    return await this.testcaseRepository
      .createQueryBuilder('testcase')
      .select(['testcase.input', 'testcase.output'])
      .where('testcase.problemId = :problemId', { problemId: problem.id })
      .take(3)
      .getMany();
  }
}
