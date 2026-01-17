import {
  ArgumentMetadata,
  ForbiddenException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { SocialPostsService } from '../social_posts.service';
import { NOT_CONTAINS } from 'class-validator';

@Injectable()
export class SocialPostExistPipe implements PipeTransform {
  constructor(private readonly socialPostsService: SocialPostsService) {}
  transform(value: any, metadata: ArgumentMetadata) {
    try {
      const post = this.socialPostsService.findOne(value);
    } catch (e) {
      throw new ForbiddenException(`NO Data Found ID: ${value}`);
    }
    return value;
  }
}
