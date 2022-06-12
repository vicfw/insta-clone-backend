import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FollowingService } from './following.service';
import { Following } from './entities/following.entity';
import { CreateFollowingInput } from './dto/create-following.input';
import { UpdateFollowingInput } from './dto/update-following.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../users/guard/auth.guard';

@Resolver(() => Following)
export class FollowingResolver {
  constructor(private readonly FollowingService: FollowingService) {}

  @Mutation(() => Following, { name: 'followUser' })
  @UseGuards(AuthGuard)
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

  @Mutation(() => Following)
  removeFollowing(@Args('id', { type: () => Int }) id: number) {
    return this.FollowingService.remove(id);
  }
}
