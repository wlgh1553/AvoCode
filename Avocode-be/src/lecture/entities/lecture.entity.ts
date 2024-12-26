import { Chapter } from '@chapter/entities/chapter.entity';
import { CompletedLecture } from '@completedLecture/entity/completed-lecture.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Lecture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: false })
  public lecture_name: string;

  @Column('text', { nullable: false })
  public contents: string;

  @ManyToOne(() => Chapter, { createForeignKeyConstraints: true })
  @JoinColumn({ name: 'chapter_id', referencedColumnName: 'id' })
  public chapter: Chapter;

  @OneToMany(
    () => CompletedLecture,
    (completedLecture) => completedLecture.lecture,
    {
      cascade: true,
    },
  )
  public completedLectures: CompletedLecture[];

  @Column('text', { nullable: false })
  public quiz_description: string;

  @Column('int', { nullable: false })
  public quiz_answer: number;

  @Column('text', { nullable: false })
  public quiz_sel1: string;

  @Column('text', { nullable: false })
  public quiz_sel2: string;

  @Column('text', { nullable: false })
  public quiz_sel3: string;
}
