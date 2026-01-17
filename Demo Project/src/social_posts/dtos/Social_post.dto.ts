import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SocialPostDTO {
  id: number;
  title: string;
  content: string;
  authorName: string;
  createdAt: Date;
}
