import { LanguageType, SolvedResultType } from '@common/enums';
import { Problem } from '@problem/entities/problem.entity';
import { User } from '@user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Submission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Problem, { createForeignKeyConstraints: true })
  @JoinColumn({ name: 'problem_id', referencedColumnName: 'id' })
  public problem: Problem;

  @ManyToOne(() => User, { createForeignKeyConstraints: true })
  @JoinColumn({ name: 'user_uuid', referencedColumnName: 'uuid' })
  public user: User;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @Column('text', { nullable: false })
  public code: string; //base64된 형식으로 저장

  @Column('enum', { enum: LanguageType, default: LanguageType.C })
  public language: LanguageType;

  @Column('enum', { enum: SolvedResultType, default: SolvedResultType.RUNNING })
  public result: SolvedResultType;

  @Column('float', { default: 0 })
  public score: number;
}
