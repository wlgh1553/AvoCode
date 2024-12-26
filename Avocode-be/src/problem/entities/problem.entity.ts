import { Chapter } from '@chapter/entities/chapter.entity';
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
  public title: string;

  @Column('text', { nullable: false })
  public description: string;

  @OneToMany(() => Testcase, (testcase) => testcase.problem)
  public testcases: Testcase[];

  @ManyToOne(() => Chapter, { createForeignKeyConstraints: true })
  @JoinColumn({ name: 'chapter_id', referencedColumnName: 'id' })
  public chapter: Chapter;

  @OneToMany(() => Submission, (submission) => submission.problem, {
    cascade: true,
  })
  public submissions: Submission[];
}
