import { TestCaseType } from '@common/enums';
import { Problem } from '@problem/entities/problem.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Testcase {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('text', { nullable: false })
  public input: string;

  @Column('text', { nullable: false })
  public output: string;

  @ManyToOne(() => Problem, (problem) => problem.testcases)
  public problem: Problem;

  @Column('enum', {
    nullable: false,
    enum: TestCaseType,
    default: TestCaseType.GRADING_TEST_CASE,
  })
  public type: TestCaseType;
}
