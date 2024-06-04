import { TestCaseType } from '@common/enums';
import { PickType } from '@nestjs/swagger';
import { Problem } from '@problem/entities/problem.entity';
import { Testcase } from '@testcase/entities/testcase.entity';
import { IsNotEmpty } from 'class-validator';

export class CreateTestcaseDto extends PickType(Testcase, [
  'input',
  'output',
  'type',
]) {
  @IsNotEmpty()
  public problem: Problem;

  @IsNotEmpty()
  public input: string;

  @IsNotEmpty()
  public output: string;

  @IsNotEmpty()
  public type: TestCaseType;
}
