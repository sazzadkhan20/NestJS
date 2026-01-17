import { Module } from '@nestjs/common';
import { SocialPostsController } from './social_posts.controller';
import { SocialPostsService } from './social_posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialPostEntity } from './entities/social_post.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([SocialPostEntity]),AuthModule],
  controllers: [SocialPostsController],
  providers: [SocialPostsService]
})
export class SocialPostsModule {}
