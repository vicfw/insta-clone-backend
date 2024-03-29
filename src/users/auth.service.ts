import { AuthUserInput } from './dto/signup-user-input';
import { UsersService } from './users.service';
import { BadRequestException, Injectable, Res } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { SignInUserInput } from './dto/signin-user-input';
import { Response } from 'express';
import { signJwt } from 'src/utils/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async singUp(createUserInput: AuthUserInput) {
    const user = await this.usersService.findAll(createUserInput.email);

    if (user.length) {
      throw new BadRequestException('email is already exist');
    }

    const hashedPassword = await bcrypt.hash(createUserInput.password, 12);

    return await this.usersService.create({
      email: createUserInput.email,
      password: hashedPassword,
      username: createUserInput.username,
    });
  }

  async logIn(signupUserDto: SignInUserInput, res: Response) {
    const [user] = await this.usersService.findAll(signupUserDto.email);

    if (!user) {
      throw new BadRequestException(
        'Sorry, your password was incorrect. Please double-check your password.',
      );
    }
    const isPasswordCorrect = await bcrypt.compare(
      signupUserDto.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new BadRequestException('email or password is incorrect');
    }

    const jwt = signJwt(user.id);

    res.cookie('jwt', jwt, { httpOnly: true, secure: true });

    return {
      ...user,
    };
  }
}
