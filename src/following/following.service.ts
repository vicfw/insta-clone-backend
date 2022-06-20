import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FollowerService } from 'src/follower/follower.service';
import { Repository } from 'typeorm';
import { CreateFollowingInput } from './dto/create-following.input';
import { UpdateFollowingInput } from './dto/update-following.input';
import { Following } from './entities/following.entity';

@Injectable()
export class FollowingService {
  constructor(
    @InjectRepository(Following)
    private followingRepository: Repository<Following>,
    private followerService: FollowerService,
  ) {}
  async create(createFollowingInput: CreateFollowingInput) {
    await this.followerService.create({
      followerUserId: createFollowingInput.userId,
      userId: createFollowingInput.followedUserId,
    });

    const Following = await this.followingRepository.create(
      createFollowingInput,
    );
    return await this.followingRepository.save(Following);
  }

  findAll() {
    return `This action returns all Following`;
  }

  async findOne(id: number) {
    return await this.followingRepository.findOne(id);
  }

  update(id: number, updateFollowingInput: UpdateFollowingInput) {
    return `This action updates a #${id} Following`;
  }

  async remove(id: number) {
    await this.followerService.remove(id);
    return await this.followingRepository.delete({ userId: id });
  }
}
