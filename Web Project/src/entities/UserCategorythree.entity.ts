import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserCategoryThreeEntity
{
    @PrimaryGeneratedColumn()
    Id: number;

    @Column({type:'varchar', length: 100, unique:true})
    userName: string;

    @Column({type: 'varchar', length: 150})
    fullName: string;

    @Column({type: 'boolean' , default: false})
    isActive: boolean;
}