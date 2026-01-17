import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SocialPost as Post } from './interfeces/social_post.interfece';
import { InjectRepository } from '@nestjs/typeorm';
import { SocialPostEntity } from './entities/social_post.entity';
import { Repository } from 'typeorm';
import { SocialPostDTO } from './dtos/Social_post.dto';
import { CreatePostDTO } from './dtos/create_post.dto';
import { UpdatePostDTO } from './dtos/update_post.dto';
import { plainToInstance } from 'class-transformer';
import { title } from 'process';
import { UserEntity } from 'src/auth/entities/user.entity';
import { CurrentUser } from 'src/auth/decorators/current_user.decorator';

@Injectable()
export class SocialPostsService {
  constructor(
    @InjectRepository(SocialPostEntity)
    private readonly socialPostRepository: Repository<SocialPostEntity>,
  ) {}

  // pattern match
  async findAll(search: string): Promise<SocialPostDTO[]> {
    const posts = await this.socialPostRepository.find({
      relations: ['user'],
    });
    if (search == null) return posts; // check null/undefined
    return posts.filter((searchPost) =>
      searchPost.title.toLowerCase().includes(search.toLowerCase()),
    );
    // filter return multiple
  }

  async findOne(id: number) {
    const post = await this.socialPostRepository.findOne({
      where: { id: id },
      relations: ['user'],
    }); // return entity
    if (post == null) return null;
    return post;
  }

  async create(
    createSocialPost: CreatePostDTO,
    user: any,
  ): Promise<SocialPostDTO> {
    const post = await this.socialPostRepository.create({
      title: createSocialPost.title,
      content: createSocialPost.content,
      authorName: user.name,
      user: user,
    });
    return await this.socialPostRepository.save(post);
  }

  async update(
    id: number,
    updatePost: UpdatePostDTO,
    user: any,
  ): Promise<SocialPostDTO> {
    const updatedContent = await this.socialPostRepository.findOneBy({
      id: id,
    });
    if (!updatedContent)
      throw new NotFoundException(`Social Post with ID ${id} Not Available`);
    if (updatedContent.user.id !== id || updatedContent.user.role !== user.role)
      throw new ForbiddenException('Permission Deny');
    const updatedPost = this.socialPostRepository.merge(
      updatedContent,
      updatePost,
    );
    return await this.socialPostRepository.save(updatedPost);
  }

  async remove(id: number): Promise<void> {
    await this.socialPostRepository.delete({ id: id });
  }

  // private posts: Post[] = [
  //   {
  //     id: 1,
  //     title: 'FB Post-1',
  //     content: 'This is First Post',
  //     authorName: 'Sazzad',
  //     createdAt: new Date(),
  //   },
  //   {
  //     id: 2,
  //     title: 'FB Post-2',
  //     content: 'This is Second Post',
  //     authorName: 'Jon',
  //     createdAt: new Date(),
  //   },
  // ];

  // // pattern match
  // findAll(search: string): Post[] {
  //   if (search == null) return this.posts; // check null/undefined
  //   return this.posts.filter((searchPost) =>
  //     searchPost.title.toLowerCase().includes(search.toLowerCase()),
  //   );
  //   // filter return multiple
  // }

  // findOne(id: number): Post {
  //   const post = this.posts.find((post) => post.id === id); // find return 1
  //   if (!post)
  //     throw new NotFoundException(`Social Post with ID ${id} Not Available`);
  //   return post;
  // }

  // create(createSocialPost: Omit<Post, 'id' | 'createdAt'>): Post {
  //   const newPost: Post = {
  //     id: this.getNextId(),
  //     ...createSocialPost,
  //     createdAt: new Date(),
  //   };
  //   this.posts.push(newPost);
  //   return newPost;
  // }

  // update(id: number, updatePost: Partial<Post>): Post {
  //   const updatedContentIndex = this.posts.findIndex((post) => post.id === id);
  //   if (updatedContentIndex === -1)
  //     throw new NotFoundException(`Social Post with ID ${id} Not Available`);
  //   this.posts[updatedContentIndex] = {
  //     ...this.posts[updatedContentIndex],
  //     ...updatePost,
  //     updatedAt: new Date(),
  //   };
  //   return this.posts[updatedContentIndex];
  // }

  // remove(id: number): { message: string } {
  //   const deleteContentIndex = this.posts.findIndex((post) => post.id === id);
  //   if (deleteContentIndex === -1)
  //     throw new NotFoundException(`Social Post with ID ${id} Not Available`);
  //   this.posts.slice(deleteContentIndex, 1);
  //   return { "message": `Delete Social Post with ID ${id}` };
  // }

  // private getNextId(): number {
  //   return this.posts.length + 1;
  // }
}
