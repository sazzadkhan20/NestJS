import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdatePostDTO {
  @IsOptional()
  @IsNotEmpty({ message: 'title not empty' })
  @IsString({ message: 'title must be string' })
  @MinLength(3, { message: 'Min Length of title is 3' })
  title?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'content not empty' })
  @IsString({ message: 'content must be string' })
  @MinLength(3, { message: 'Min Length of content is 3' })
  content?: string;

//   @IsOptional()
//   @IsNotEmpty({ message: 'author Name not empty' })
//   @IsString({ message: 'author Name must be string' })
//   @MinLength(3, { message: 'Min Length of author Name is 3' })
//   authorName?: string;
}
