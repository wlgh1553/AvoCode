import { Chapter } from '@chapter/entities/chapter.entity';
import { CategoryList } from '@common/enums';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('enum', {
    nullable: false,
    enum: CategoryList,
    default: CategoryList.NONE,
  })
  public category_name: CategoryList;

  @OneToMany(() => Chapter, (chapter) => chapter.category, { cascade: true })
  public chapter_list: Chapter[];
}
