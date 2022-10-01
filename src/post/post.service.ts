import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrentUserId } from 'src/users/decorators/current-user.decorator';
import { Repository } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
  ) {}
  async create(createPostInput: CreatePostInput) {
    const post = await this.postsRepository.create(createPostInput);

    if (!post) {
      throw new BadRequestException();
    }
    return await this.postsRepository.save(post);
  }

  async findAll(userId: number) {
    const userPosts = await this.postsRepository.find({
      where: { userId: [1, 2, 3] },
    });

    console.log(userPosts);
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostInput: UpdatePostInput) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
