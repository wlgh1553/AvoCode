import { CategoryList } from "@common/enums";
import { Problem } from "@problem/entities/problem.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('enum', { nullable: false, enum: CategoryList, default: CategoryList.NONE })
    public category_name: CategoryList;

    @OneToMany(() => Problem, (problem) => problem.category, { cascade: true })
    public problem_list: Problem[]
}
