import { Controller, Get, Post,Patch, Put, Param, Query, Body, ParseIntPipe, UsePipes, ValidationPipe, UseInterceptors, UploadedFile, Delete } from '@nestjs/common';
import { EnrollmentService } from '../services/enrollment.service';
import { CreateStudentDto } from '../dtos/createStudent.dto';
import { CreateUserCategoryFourDto, CreateUserCategoryOneDto, CreateUserCategoryThreeDto, CreateUserCategoryTwoDto, updateUserCategoryOneStatusDto } from '../dtos/createUserCategory.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';
import { Console } from 'console';
import { UserCategoryOneEntity } from 'src/entities/UserCategoryOne.entity';
import { UserCategoryTwoEntity } from 'src/entities/UserCategoryTwo.entity';
import { UserCategoryThreeEntity } from 'src/entities/UserCategorythree.entity';
import { PARAMTYPES_METADATA } from '@nestjs/common/constants';

@Controller('enrollment')
export class EnrollmentController 
{
    constructor(private readonly enrollmentService: EnrollmentService) {}

    // User Category 1
    
    // Create User
    @Post('createUserCategoryOne')
    createUserCategoryOne(@Body() body: UserCategoryOneEntity)
    {
        return this.enrollmentService.createUserCategoryOne(body);
    }

    // Update User
    @Patch('updateUserCategoryOneStatus')
    updateUserCategoryOneStatus(@Query('fname') fname: string)
    {
        return this.enrollmentService.updateUserCategoryOneStatus(fname);
    }

    // List of inactive users
    @Get('users')
    ListofInactiveUsers(@Query('status') status : any)
    {
        return this.enrollmentService.ListofInactiveUsers(status);
    }

    @Get('users/:age')
    ListofUsersSpeceficAge(@Param('age',ParseIntPipe) age: number)
    {
        return this.enrollmentService.ListofUsersSpeceficAge(age);
    }


    // User Category 2

    // create user
    @Post('createusercategorytwo')
    createUserCategoryTwo(@Body() user : UserCategoryTwoEntity)
    {
        return this.enrollmentService.createUserCategoryTwo(user);
    }

    @Patch('phonenumber/:id')
    updateUserCategoryTwoPhone(@Param('id') id: string,@Body() phone: any)
    {
        return this.enrollmentService.updateUserCategoryTwoPhone(id,phone);
    }

    @Get('usersfnamenull')
    usersFullnameNull()
    {
        return this.enrollmentService.usersFullnameNull();
    }

    @Delete('removeuser')
    deleteUserCategoryTwo(@Query('id') id: string)
    {
        return this.enrollmentService.deleteUserCategoryTwo(id);
    }

    // User Category 3

    @Post('createusercategorythree')
    createUserCategoryThree(@Body() user : UserCategoryThreeEntity)
    {
        return this.enrollmentService.createUserCategoryThree(user);
    }

    @Get()
    getUsersSpecificFullNameSubStr(@Query('fnamesubstr') substr: string)
    {
        return this.enrollmentService.getUsersSpecificFullNameSubStr(substr);
    }


    // GET Routes

    // @Get('studentinfo')
    // getEnrollmentInfo(): string 
    // {
    //     return this.enrollmentService.getEnrollmentInfo();
    // }

    // @Get('student/:name')
    // getEnrollmentStudentInfoByName(@Param('name') name: string): string 
    // {
    //     return this.enrollmentService.getEnrollmentStudentInfoByName(name);
    // }

    // // localhost:7000/enrollment/student?id=22&name=Sazzad
    // @Get('student')
    // getEnrollmentStudentInfoByID(
    //     @Query('id', ParseIntPipe) id: number,
    //     @Query('name') name: string
    // ): string 
    // {
    //     return this.enrollmentService.getEnrollmentStudentInfoByID(id, name);
    // }

    // @Get('students')
    // getAll() 
    // {
    //     return this.enrollmentService.getStudent();
    // }

    // // POST Routes 

    // @Post('create') // simple POST without DTO
    // createStudent(@Body() body: any) 
    // {
    //     return this.enrollmentService.createStudent(body);
    // }
    
    // // PUT Route
    // @Put('student')
    // updateStudent(@Body() updated: any) 
    // {
    //     return this.enrollmentService.updateStudent(updated);
    // }

    // @Post('studentdto') // POST using DTO
    // createStudentUsingDTO(@Body() createStudentDto: CreateStudentDto)
    // {
    //     return this.enrollmentService.createStudentUsingDTO(createStudentDto);
    // }

    // @Post('validateusercategoryone')
    // @UseInterceptors(FileInterceptor('file',
    // { 
    //     fileFilter: (req, file, cb) => {
    //         if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
    //             cb(null, true);
    //         else 
    //             cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
    // },
    //     limits: { fileSize: 2*1024*1024 },
    //     storage:diskStorage({
    //         destination: './UserNIDImages',
    //         filename: function (req, file, cb) {
    //             cb(null,Date.now()+file.originalname)
    //             },
    //     })
    // }))
    // @UsePipes(new ValidationPipe())
    // createUserCategoryOne(@UploadedFile() file: Express.Multer.File, @Body() createUserCategoryOneDto: CreateUserCategoryOneDto): object
    // {
    //     return this.enrollmentService.createUserCategoryOne(createUserCategoryOneDto,file);
    // }

    // @Post('validateusercategorytwo')
    // @UsePipes(new ValidationPipe())
    // createUserCategoryTwo(@Body() createUserCategoryTwoDto: CreateUserCategoryTwoDto): object
    // {
    //     return this.enrollmentService.createUserCategoryTwo(createUserCategoryTwoDto);
    // }

    //  @Post('validateusercategorythree')
    // @UseInterceptors(FileInterceptor('file',
    // { 
    //     fileFilter: (req, file, cb) => {
    //         if (file.originalname.match(/^.*\.(pdf)$/))
    //             cb(null, true);
    //         else 
    //             cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'pdf'), false);
    // },
    //     limits: { fileSize: 10*1024*1024 },
    //     storage:diskStorage({
    //         destination: './UserAllPDF',
    //         filename: function (req, file, cb) {
    //             cb(null,Date.now()+file.originalname)
    //             },
    //     })
    // }))
    // @UsePipes(new ValidationPipe())
    // createUserCategoryThree(file: Express.Multer.File,@Body() createUserCategorythreeDto: CreateUserCategoryThreeDto): object
    // {
    //     return this.enrollmentService.createUserCategoryThree(file,createUserCategorythreeDto);
    // }

    // @Post('validateusercategoryfour')
    // @UsePipes(new ValidationPipe())
    // createUserCategoryFour(@Body() createUserCategoryFourDto: CreateUserCategoryFourDto): object
    // {
    //     return this.enrollmentService.createUserCategoryFour(createUserCategoryFourDto);
    // }

}
