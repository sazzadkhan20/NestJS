import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from '../dtos/createStudent.dto';
import { CreateUserCategoryFourDto, CreateUserCategoryOneDto, CreateUserCategoryThreeDto, CreateUserCategoryTwoDto, updateUserCategoryOneStatusDto } from '../dtos/createUserCategory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCategoryOneEntity } from 'src/entities/UserCategoryOne.entity';
import { Equal, IsNull, Like, MoreThanOrEqual, Repository } from 'typeorm';
import { UserCategoryTwoEntity } from 'src/entities/UserCategoryTwo.entity';
import { UserCategoryThreeEntity } from 'src/entities/UserCategorythree.entity';

@Injectable()
export class EnrollmentService 
{
    phone: string | undefined;
    constructor(@InjectRepository(UserCategoryOneEntity) private userCategoryOneRepository: Repository<UserCategoryOneEntity>,
                @InjectRepository(UserCategoryTwoEntity) private userCategoryTwoRepository: Repository<UserCategoryTwoEntity>,
                @InjectRepository(UserCategoryThreeEntity) private userCategoryThreeRepository: Repository<UserCategoryThreeEntity>){}

    // User Category One
    async createUserCategoryOne(user: UserCategoryOneEntity): Promise<UserCategoryOneEntity>
    {
        console.log("created user1");
        // const id = user.id;
        // const email = `${id}@student.aiub.edu`;
        // user.email = email;
        return await this.userCategoryOneRepository.save(user);
    }

    async updateUserCategoryOneStatus(fname: string)
    {
        const user = await this.userCategoryOneRepository.findOne({where: {fullname: fname}});
        if(!user)
            return {message : "User Not Found"};
        if(user.status == 'active')
            user.status = 'inactive';
        else
            user.status = 'active';
        return await this.userCategoryOneRepository.save(user);
    }

    async ListofInactiveUsers(status : any): Promise<UserCategoryOneEntity[]>
    {
        return await this.userCategoryOneRepository.find({where:{status: status}});
    }

    async ListofUsersSpeceficAge(age : number): Promise<UserCategoryOneEntity[]>
    {
        return await this.userCategoryOneRepository.find({where : {age: MoreThanOrEqual(age)}});
    }

    // User Category Two
    async createUserCategoryTwo(user : UserCategoryTwoEntity) : Promise<UserCategoryTwoEntity>
    {
        // Generate ID after all properties are set
        if (user.phone) {
            const lastThreeDigits = user.phone.toString().slice(-3);
            user.Id = lastThreeDigits + Math.floor(Math.random() * 1000).toString();
        }
        return await this.userCategoryTwoRepository.save(user);
    }

    async updateUserCategoryTwoPhone(id: string,data: any)
    {
        const user = await this.userCategoryTwoRepository.findOneBy({Id:id});
         if(!user)
            return {message : "User Not Found"};
        const ph = data.phone;
        user.phone = ph;
        return await this.userCategoryTwoRepository.save(user);
    }

    async usersFullnameNull() : Promise<UserCategoryTwoEntity[]>
    {
        return await this.userCategoryTwoRepository.find({where: {fullName: IsNull()}});
    }

    async deleteUserCategoryTwo(id : string)
    {
        return await this.userCategoryTwoRepository.delete({Id:id});
    }

    //User Category 3

    async createUserCategoryThree(user: UserCategoryThreeEntity): Promise<UserCategoryThreeEntity>
    {
        console.log("created user3");
        return await this.userCategoryThreeRepository.save(user);
    }

    async getUsersSpecificFullNameSubStr(substr: string): Promise<UserCategoryThreeEntity[]>
    {
        return await this.userCategoryThreeRepository.find({where: {
            fullName: Like('%'+substr+'%')
        }})
    }

//     // In-memory array to store students
//     private student: any = null;
//     // GET Methods
//     getEnrollmentInfo(): string 
//     {
//         return "Name : ABC\nID : xxxxx\nPayment : Bikash";
//     }

//     getEnrollmentStudentInfoByName(name: string): string 
//     {
//         return `Name : ${name}\nID : xxxxx\nPayment : Bikash`;
//     }

//     getEnrollmentStudentInfoByID(ID: number, name: string): string 
//     {
//         return `Name : ${name}\nID : ${ID}\nPayment : Bikash`;
//     }

//   // POST Methods

//     // Simple POST without DTO
//     createStudent(student: any): object
//     {
//         this.student = student;
//         console.log("created");
//         return {
//          id: student.id,
//          name: student.name
//         };
//     }

//     // POST using DTO
//     createStudentUsingDTO(createStudentDto: CreateStudentDto) 
//     {
//         const { name, id } = createStudentDto;
//         const student = { id, name };
//         this.student = student;
//         return `Student ${name}`;
//     }

//   //  PUT Method

//     // Update student
//     updateStudent(updated: any) {
//     if (!this.student) {
//         return { message: "No student found" };
//     }

//     // Merge old student with new data
//     this.student = { ...this.student, ...updated };

//     // Return only id and name
//     return {
//     student: updated
//     };
//     }

//     // Get student
//     getStudent() {
//     return this.student;
//     }

//     createUserCategoryOne(createUserCategoryOne : CreateUserCategoryOneDto,file: Express.Multer.File):object
//     {
//         return{
//             details: {
//                 UserEmail: createUserCategoryOne.email,
//                 UserName: createUserCategoryOne.uName
//             },
//             File: file
//         };
//     }

//     createUserCategoryTwo(createUserCategoryTwo : CreateUserCategoryTwoDto):object
//     {
//         return createUserCategoryTwo;
//     }

//     createUserCategoryThree(file: Express.Multer.File, createUserCategoryThree : CreateUserCategoryThreeDto):object
//     {
//         return {
//             details: createUserCategoryThree,
//             PDF: file
//         };
//     }

//     createUserCategoryFour(createUserCategoryFour : CreateUserCategoryFourDto):object
//     {
//         return createUserCategoryFour;
//     }

}
