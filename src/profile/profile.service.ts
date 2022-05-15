import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private profileRepo: Repository<Profile>,
  ) {}
  async create(createProfileInput: CreateProfileInput) {
    const profile = this.profileRepo.create(createProfileInput);
    return await this.profileRepo.save(profile);
  }

  findAll() {
    return `This action returns all profile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  async update(id: number, updateProfileInput: UpdateProfileInput) {
    return await this.profileRepo.update({ id: id }, updateProfileInput);
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
