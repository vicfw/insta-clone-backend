import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUserId } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';
import { PostService } from './post.service';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post)
  createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @CurrentUserId() userId: number,
  ) {
    return this.postService.create({ ...createPostInput, userId: userId });
  }

  @Query(() => [Post], { name: 'posts' })
  // @UseInterceptors(SaveCurrentUser)
  findAll(@CurrentUserId() user: number) {
    return this.postService.findAll(user);
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.postService.findOne(id);
  }

  @Mutation(() => Post)
  updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postService.update(updatePostInput.id, updatePostInput);
  }

  @Mutation(() => Post)
  removePost(@Args('id', { type: () => Int }) id: number) {
    return this.postService.remove(id);
  }
}
