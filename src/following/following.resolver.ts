import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FollowingService } from './following.service';
import { Following } from './entities/following.entity';
import { CreateFollowingInput } from './dto/create-following.input';
import { UpdateFollowingInput } from './dto/update-following.input';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Following)
export class FollowingResolver {
  constructor(private readonly FollowingService: FollowingService) {}

  @Mutation(() => Following, { name: 'followUser' })
  async createFollowing(
    @Args('createFollowing') createFollowingInput: CreateFollowingInput,
  ) {
    return await this.FollowingService.create(createFollowingInput);
  }

  @Query(() => [Following], { name: 'following' })
  findAll() {
    return this.FollowingService.findAll();
  }

  @Query(() => Following, { name: 'oneFollowing' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.FollowingService.findOne(id);
  }

  @Mutation(() => Following)
  updateFollowing(
    @Args('updateFollowingInput') updateFollowingInput: UpdateFollowingInput,
  ) {
    return this.FollowingService.update(
      updateFollowingInput.id,
      updateFollowingInput,
    );
  }

  @Mutation(() => Following, { name: 'removeFollowing' })
  removeFollowing(@Args('id', { type: () => Int }) id: number) {
    return this.FollowingService.remove(id);
  }
}
