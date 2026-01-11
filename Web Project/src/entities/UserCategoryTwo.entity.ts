import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryColumn } from "typeorm";


@Entity()
export class UserCategoryTwoEntity
{
    @PrimaryColumn()
    Id: string;

    @BeforeInsert()
    generateId()
    {
        // Custom logic of Id
        const ph = this.phone;
        let temp = "";
        let count = 0;
        for(let i=ph.length-1; i>=0; i--)
        {
            count++;
            temp += ph[i];
            if(count === 3)
                break;
        }
        this.Id =  temp + Math.floor(Math.random() * 1000).toString();
    }

    @Column({type: 'bool',default: true})
    isActive: boolean;

    @Column({type: 'varchar',nullable: true})
    fullName: string;

    @Column({type: 'bigint',unsigned: true})
    phone: string;

    // @Column()
    // email: string

}