import { AuthUserInput } from './dto/signup-user-input';
import { UsersService } from './users.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Login } from './types/logIn';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async singUp(createUserInput: AuthUserInput) {
    const user = await this.usersService.findAll(createUserInput.email);

    if (user.length) {
      throw new BadRequestException('email is already exist');
    }

    const hashedPassword = await bcrypt.hash(createUserInput.password, 12);

    return await this.usersService.create({
      email: createUserInput.email,
      password: hashedPassword,
    });
  }

  async logIn(signupUserDto: AuthUserInput) {
    const [user] = await this.usersService.findAll(signupUserDto.email);

    if (!user) {
      throw new BadRequestException();
    }
    const isPasswordCorrect = await bcrypt.compare(
      signupUserDto.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new BadRequestException('email or password is incorrect');
    }

    return {
      ...user,
      accessToken: this.jwtService.sign({ id: user.id }),
    };
  }
}
