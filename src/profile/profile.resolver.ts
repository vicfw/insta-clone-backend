import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { Profile } from './entities/profile.entity';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { User } from 'src/users/entities/user.entity';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Mutation(() => Profile)
  createProfile(
    @Args('createProfileInput') createProfileInput: CreateProfileInput,
  ) {
    return this.profileService.create(createProfileInput);
  }

  @Query(() => [Profile], { name: 'profile' })
  findAll() {
    return this.profileService.findAll();
  }

  @Query(() => Profile, { name: 'profile' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.profileService.findOne(id);
  }

  @Mutation(() => User)
  async updateProfile(
    @Args('updateProfileInput') updateProfileInput: UpdateProfileInput,
  ) {
    return await this.profileService.update(
      updateProfileInput.profile_id,
      updateProfileInput,
    );
  }

  @Mutation(() => Profile)
  removeProfile(@Args('id', { type: () => Int }) id: number) {
    return this.profileService.remove(id);
  }
}
