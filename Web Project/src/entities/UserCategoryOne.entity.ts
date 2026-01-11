import { maxLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('UserCategoryOne')
export class UserCategoryOneEntity
{
    @PrimaryGeneratedColumn({type: 'int',unsigned: true})
    id : number;

    @Column({type: 'varchar',length: 100})
    fullname : string;

    @Column({type: 'int',unsigned: true})
    age : number;

    @Column({
        type: 'enum',
        enum: ['active','inactive'],
        default: 'active'
    })
    status: 'active' | 'inactive';
}