import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FollowerService } from './follower.service';
import { Follower } from './entities/follower.entity';
import { CreateFollowerInput } from './dto/create-follower.input';
import { UpdateFollowerInput } from './dto/update-follower.input';

@Resolver(() => Follower)
export class FollowerResolver {
  constructor(private readonly followerService: FollowerService) {}

  @Mutation(() => Follower)
  createFollower(@Args('createFollowerInput') createFollowerInput: CreateFollowerInput) {
    return this.followerService.create(createFollowerInput);
  }

  @Query(() => [Follower], { name: 'follower' })
  findAll() {
    return this.followerService.findAll();
  }

  @Query(() => Follower, { name: 'follower' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.followerService.findOne(id);
  }

  @Mutation(() => Follower)
  updateFollower(@Args('updateFollowerInput') updateFollowerInput: UpdateFollowerInput) {
    return this.followerService.update(updateFollowerInput.id, updateFollowerInput);
  }

  @Mutation(() => Follower)
  removeFollower(@Args('id', { type: () => Int }) id: number) {
    return this.followerService.remove(id);
  }
}
