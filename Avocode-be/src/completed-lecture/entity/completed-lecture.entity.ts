import { Lecture } from '@lecture/entities/lecture.entity';
import { User } from '@user/entities/user.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CompletedLecture {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { createForeignKeyConstraints: true })
  @JoinColumn({ name: 'uuid', referencedColumnName: 'uuid' })
  public user: User;

  @ManyToOne(() => Lecture, { createForeignKeyConstraints: true })
  @JoinColumn({ name: 'lecture_id', referencedColumnName: 'id' })
  public lecture: Lecture;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;
}
