import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatePostDTO {
  @IsNotEmpty({ message: 'title not empty' })
  @IsString({ message: 'title must be string' })
  @MinLength(3, { message: 'Min Length of title is 3' })
  title: string;

  @IsNotEmpty({ message: 'content not empty' })
  @IsString({ message: 'content must be string' })
  @MinLength(3, { message: 'Min Length of content is 3' })
  content: string;
}
