import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFollowerInput } from './dto/create-follower.input';
import { UpdateFollowerInput } from './dto/update-follower.input';
import { Follower } from './entities/follower.entity';

@Injectable()
export class FollowerService {
  constructor(
    @InjectRepository(Follower)
    private followerRepository: Repository<Follower>,
  ) {}
  async create(createFollowerInput: CreateFollowerInput) {
    const follower = await this.followerRepository.create(createFollowerInput);
    return await this.followerRepository.save(follower);
  }

  findAll() {
    return `This action returns all follower`;
  }

  findOne(id: number) {
    return `This action returns a #${id} follower`;
  }

  update(id: number, updateFollowerInput: UpdateFollowerInput) {
    return `This action updates a #${id} follower`;
  }

  remove(id: number) {
    return `This action removes a #${id} follower`;
  }
}
