import { Category } from '@category/entities/category.entity';
import { Submission } from '@submission/entities/submission.entity';
import { Testcase } from '@testcase/entities/testcase.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Problem {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('text', { nullable: false })
  public description: string;

  @OneToMany(() => Testcase, (testcase) => testcase.problem)
  public testcases: Testcase[];

  @ManyToOne(() => Category, { createForeignKeyConstraints: true })
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  public category: Category;

  @OneToMany(() => Submission, (submission) => submission.problem, {
    cascade: true,
  })
  public submissions: Submission[];
}
