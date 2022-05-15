import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { AuthUserInput } from './dto/signup-user-input';
import { ProfileService } from 'src/profile/profile.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private profileService: ProfileService,
  ) {}

  async create(createUserInput: AuthUserInput) {
    const profile = await this.profileService.create({
      profile_pic: 'default-profile.jpg',
    });

    const user = this.usersRepository.create({
      ...createUserInput,
      profileId: profile.id,
    });

    return await this.usersRepository.save(user);
  }

  async findAll(email: string) {
    return await this.usersRepository.find({ email });
  }

  async findOne(id: number) {
    return await this.usersRepository.findOne(
      { id },
      { relations: ['story', 'profile'] },
    );
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
