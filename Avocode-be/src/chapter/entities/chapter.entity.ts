import { Category } from '@category/entities/category.entity';
import { Problem } from '@problem/entities/problem.entity';
import { CompletedLecture } from '@root/completed-lecture/entity/completed-lecture.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Chapter {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Category, { createForeignKeyConstraints: true })
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  public category: Category;

  @Column('int', { nullable: false })
  public chapter_no: number;

  @Column('text', { nullable: false })
  public chapter_name: string;

  @OneToMany(() => Problem, (problem) => problem.chapter, {
    cascade: true,
  })
  public problems: Problem[];

  @OneToMany(
    () => CompletedLecture,
    (completedLecture) => completedLecture.lecture,
    {
      cascade: true,
    },
  )
  public completedLectures: CompletedLecture[];
}
