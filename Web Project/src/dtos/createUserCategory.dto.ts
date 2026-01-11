import { Type } from "class-transformer";
import { IsAlpha, IsDate, IsNotEmpty, IsPhoneNumber, IsString, IsUrl,Matches } from "class-validator"

export class updateUserCategoryOneStatusDto
{
    @IsNotEmpty()
    @IsAlpha()
    fullname: string;

}

// Done
export class CreateUserCategoryOneDto
{
    // Contain Only Alphabets
    @IsNotEmpty({ message: 'User name is required' })
    @IsAlpha( undefined,{ message: 'User name must contain letters only' } )
    uName: string;

    @IsNotEmpty({message: 'Email is required'})
    @Matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,{message: 'Invalid Email Address'})
    email: string

    @IsNotEmpty({message: 'NID is required'})
    @Matches(/^[0-9]{10}|[0-9]{13}$/,{message: 'Invalid NID (10 or 13 digits)'})
    nid: string;

}

// Done
export class CreateUserCategoryTwoDto
{

    @IsNotEmpty({message: 'Email is required'})
    @Matches(/^[0-9]{2}-[0-9]{5}-[1-3]{1}@student.aiub.edu|[^\s@]+@aiub.edu$/,{message: 'Invalid Email Address Domain should be- @student.aiub.edu or @aiub.edu'})
    email: string

    @IsNotEmpty({ message: 'Password is required' })
    @Matches(/^(?=.*[A-Z])[\w]{6,}$/,{message: 'Password must be at least one Upper and at least 6 length'})
    password: string;

    
    @IsNotEmpty({message: 'Gender is required'})
    @Matches(/^male|female|m|f$/,{message: 'Gender value should be - male(m) or female(f)'})
    gender: string;

    @IsNotEmpty({message: 'Phone number is required'})
    @IsPhoneNumber("BD",{message: 'Not Match in BD Phone Number'})
    phoneNumber: string;

}

// Done
export class CreateUserCategoryThreeDto
{
    // Not Contain any specail character
    @IsNotEmpty({ message: 'User name is required' })
    @Matches(/^[A-Za-z0-9- ]+$/)
    uName: string;

    @IsNotEmpty({ message: 'Password is required' })
    @Matches(/^(?=.*[a-z]).{6,}$/,{message: 'Password must be at least one Lower and at least 6 length'})
    password: string;


    @IsNotEmpty({message: 'BD Phone number is required'})
    @Matches(/^01[0-9]{9}$/,{message: 'Not Match in BD Phone Number'})
    phoneNumber: string;

}

// Done
export class CreateUserCategoryFourDto
{
    // Not Contain any numbers 
    @IsNotEmpty({ message: 'User name is required' })
    @Matches(/^[^0-9]+$/)
    uName: string;

    @IsNotEmpty({ message: 'Password is required' })
    @Matches(/^(?=.*[@#$&]).+$/,{message: 'Password must be at least one Specail Character'})
    password: string;

    @IsNotEmpty({message: 'Date is required'})
    @Type(() => Date)
    @IsDate()
    eventDate: string;

    @IsNotEmpty({message: 'Social media Url is required'})
    @IsUrl()
    mediaLink: string;

}