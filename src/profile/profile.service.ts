import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private profileRepo: Repository<Profile>,
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
  ) {}
  async create(createProfileInput: CreateProfileInput) {
    const profile = this.profileRepo.create(createProfileInput);
    return await this.profileRepo.save(profile);
  }

  findAll() {
    return `This action returns all profile`;
  }

  async findOne(id: number) {
    return await this.findOne(id);
  }

  async update(id: number, updateProfileInput: UpdateProfileInput) {
    try {
      if (
        updateProfileInput.username ||
        updateProfileInput.description ||
        updateProfileInput.user_id
      ) {
        await this.userService.update(updateProfileInput.user_id, {
          id: updateProfileInput.user_id,
          username: updateProfileInput.username,
          description: updateProfileInput.description,
        });
      }

      await this.profileRepo.update(
        { id: id },
        {
          id: updateProfileInput.profile_id,
          name: updateProfileInput.name,
          profile_pic: updateProfileInput.profile_pic,
        },
      );

      const updatedUser = await this.userService.findOne(
        updateProfileInput.user_id,
      );

      return updatedUser;
    } catch (e) {
      new BadRequestException();
    }
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
