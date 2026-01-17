import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SocialPostsService } from './social_posts.service';
import { SocialPost as SocialPostInterface } from './interfeces/social_post.interfece';
import { retry } from 'rxjs';
import { CreatePostDTO } from './dtos/create_post.dto';
import { SocialPostExistPipe } from './pipes/social_post_exist.pipe';
import { SocialPostDTO } from './dtos/Social_post.dto';
import { CurrentUser } from 'src/auth/decorators/current_user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt_auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/auth/enums/user_role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('social-posts')
export class SocialPostsController {
  constructor(private readonly socialPostsService: SocialPostsService) {}

  @Get() // http://localhost:3000/social-posts?search=Post-1 or // http://localhost:3000/social-posts
  async findAll(@Query('search') search: string):Promise<SocialPostDTO[]> {
    return this.socialPostsService.findAll(search);
  }
  @Get(':id') // http://localhost:3000/social-posts/1
  async findOne(@Param('id',SocialPostExistPipe) id: number) {
    return this.socialPostsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create') // http://localhost:3000/social-posts/create
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }))
  async create(@Body() createSocialPost: CreatePostDTO,@CurrentUser() user: any): Promise<SocialPostDTO> {
    return this.socialPostsService.create(createSocialPost,user);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/:id') // http://localhost:3000/social-posts/update/4
  async update(
    @Param('id', SocialPostExistPipe) id: number,
    @Body() updatePost: Partial<SocialPostInterface>,@CurrentUser() user: any
  ): Promise<SocialPostDTO> {
    return this.socialPostsService.update(id, updatePost,user);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Delete('delete/:id') // http://localhost:3000/social-posts/delete/1
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe,SocialPostExistPipe) id: number): Promise<void> {
    return this.socialPostsService.remove(id);
  }
}
