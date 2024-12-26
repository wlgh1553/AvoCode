import { CategoryService } from '@category/category.service';
import compileAxiosInstance from '@common/axios/compile.instance';
import { LanguageType, SolvedResultType, TestCaseType } from '@common/enums';
import { ErrorType } from '@common/response/error.response';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Problem } from '@problem/entities/problem.entity';
import { ProblemService } from '@problem/problem.service';
import { CreateSubmissionDto } from '@submission/dto/create-submission.dto';
import { Submission } from '@submission/entities/submission.entity';
import { SubmissionRepository } from '@submission/submission.repository';
import { TestcaseService } from '@testcase/testcase.service';
import { UserService } from '@user/user.service';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectRepository(SubmissionRepository)
    private submissionRepository: SubmissionRepository,
    private readonly userService: UserService,
    private readonly testcaseService: TestcaseService,

    @Inject(forwardRef(() => ProblemService))
    private problemService: ProblemService,

    @Inject(forwardRef(() => CategoryService))
    private categoryService: CategoryService,
  ) {}

  public async findOneWithUser(id: number): Promise<Submission> {
    return await this.submissionRepository.findOne({
      where: { id },
      relations: { user: true },
    });
  }

  public async isCorrectSubmissionExists(user_id: string, problem_id: number) {
    return await this.submissionRepository.exists({
      where: {
        user: {
          id: user_id,
        },

        problem: {
          id: problem_id,
        },

        result: SolvedResultType.ACCEPTED,
      },
    });
  }

  public async findCodeWithAuthorityCheck(
    submission_id: number,
    userId: string,
  ): Promise<any> {
    const submission = await this.findOneWithUser(submission_id);
    if (!submission) {
      throw ErrorType.SUBMISSION_NOT_FOUND();
    }

    if (submission.user.id !== userId) {
      throw ErrorType.FORBIDDEN_ACCESS();
    }

    return {
      code: submission.code,
      language: submission.language,
    };
  }

  public async getSubmissionsByProblem(
    userId: string,
    problemId: number,
  ): Promise<Submission[] | undefined> {
    const user = await this.userService.findOne(userId);
    if (!user) throw ErrorType.USER_NOT_FOUND();

    const problem = await this.problemService.find(problemId);
    if (!problem) throw ErrorType.PROBLEM_NOT_FOUND();

    return await this.submissionRepository.find({
      where: { user: user, problem: problem },
    });
  }

  public async create(
    userId: string,
    createSubmissionDto: CreateSubmissionDto,
  ): Promise<any> {
    const problem = await this.problemService.findOne(
      createSubmissionDto.problem_id,
    );
    if (!problem) throw ErrorType.PROBLEM_NOT_FOUND();

    const user = await this.userService.findOne(userId);
    if (!user) throw ErrorType.USER_NOT_FOUND();

    const newSubmission = this.submissionRepository.create({
      problem: problem,
      user,
      code: createSubmissionDto.code,
      language: createSubmissionDto.language,
    });

    return await this.updateResult(newSubmission, problem);
  }

  public async sampleDataCompile(
    userId: string,
    createSubmissionDto: CreateSubmissionDto,
  ): Promise<any> {
    const problem = await this.problemService.findOne(
      createSubmissionDto.problem_id,
    );
    if (!problem) throw ErrorType.PROBLEM_NOT_FOUND();

    const user = await this.userService.findOne(userId);
    if (!user) throw ErrorType.USER_NOT_FOUND();

    return await this.getSolvedResult(
      createSubmissionDto.language,
      createSubmissionDto.code,
      problem,
      TestCaseType.SAMPLE_TEST_CASE,
    );
  }

  public async updateResult(submission: Submission, problem: Problem) {
    const compileResult = await this.getSolvedResult(
      submission.language,
      submission.code,
      problem,
      TestCaseType.GRADING_TEST_CASE,
    );
    submission.result = compileResult.description;
    if (compileResult.score) submission.score = compileResult.score;
    await this.submissionRepository.save(submission);
    return compileResult;
  }

  private async getSolvedResult(
    language: number,
    code: string,
    problem: Problem,
    type: TestCaseType,
  ) {
    const testcases = await this.testcaseService.findAllByProblem(
      problem,
      type,
    );

    if (testcases.length === 0) {
      return {
        description: SolvedResultType.EMPTY_TEST_CASE,
      };
    }

    let compileResult = null;
    let correctCnt = 0;
    for (const testcase of testcases) {
      console.log(testcase);
      compileResult = await this.getCompileResult(
        language,
        code,
        testcase.input,
      );

      if (compileResult.description === 'Time Limit Exceeded') {
        compileResult.description = SolvedResultType.TIME_LIMIT_EXCEEDED;
        break;
      } else if (compileResult.stdout === null) {
        compileResult.description = SolvedResultType.COMPILATION_ERROR;
        break;
      } else if (compileResult.stdout === testcase.output) {
        compileResult.description = SolvedResultType.ACCEPTED;
        correctCnt++;
      } else {
        compileResult.description = SolvedResultType.WRONG;
        break;
      }
    }

    compileResult.score = (correctCnt / testcases.length) * 100;
    return compileResult;
  }

  private async getCompileResult(
    languageType: LanguageType,
    sourceCode: string,
    inputFile: string,
  ) {
    const URL = 'submission';
    const headers = {
      'content-type': 'application/json',
      'Content-Type': 'application/json',
    };
    const payload = {
      language_id: languageType,
      source_code: Buffer.from(decodeURIComponent(sourceCode)).toString(
        'base64',
      ),
      stdin: Buffer.from(decodeURIComponent(inputFile)).toString('base64'),
      cpu_time_limit: 2,
    };
    const querystring = {
      base64_encoded: 'true',
      wait: 'true',
      fields: '*',
    };
    console.log(payload);

    try {
      const response = await compileAxiosInstance.post(URL, payload, {
        headers: headers,
        params: querystring,
      });
      const data = response.data;
      const description = data.status.description;
      const compile_output = Object.keys(data).includes('compile_output')
        ? data.compile_output
        : null;
      const stdin = this.decode(data, 'stdin');
      const stdout = this.decode(data, 'stdout');
      const language = data.language;

      const ret = {
        description,
        compile_output,
        stdin,
        stdout,
        language,
      };
      return ret;
    } catch (error) {
      throw new InternalServerErrorException('채점 서버 오류' + error);
    }
  }

  private decode(data, key) {
    if (!Object.keys(data).includes(key)) {
      return null;
    }

    if (data[key] === null) {
      return null;
    }

    return Buffer.from(decodeURIComponent(data[key]), 'base64').toString(
      'utf-8',
    );
  }
}
