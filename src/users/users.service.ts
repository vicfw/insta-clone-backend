import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { AuthUserInput } from './dto/signup-user-input';
import { ProfileService } from 'src/profile/profile.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @Inject(forwardRef(() => ProfileService))
    private profileService: ProfileService,
  ) {}

  async create(createUserInput: AuthUserInput) {
    const profile = await this.profileService.create({
      profile_pic: 'default-profile.jpg',
      name: '',
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

  async findOneByUserName(username: string) {
    return await this.usersRepository.findOne(
      { username },
      { relations: ['story', 'profile'] },
    );
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    const user = this.findOne(id);

    if (!user) return new BadRequestException();

    return await this.usersRepository.update(id, {
      ...user,
      username: updateUserInput.username,
      description: updateUserInput.description,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
