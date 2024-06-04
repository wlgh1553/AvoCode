import { UserType } from "@common/enums";
import { hash } from "argon2";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    public uuid: string;

    @Column('varchar', { nullable: false, unique: true })
    public id: string;

    @Column('varchar', { nullable: false })
    public name: string;

    @Column('varchar', { nullable: false })
    public password: string;

    @Column('enum', { nullable: false, enum: UserType, default: UserType.DEFAULT_USER })
    public type: UserType;

    @Column('int', { nullable: false, default: 0 })
    public experience: number;

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password);
    }
}