import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import { AuthService } from './auth.service';
import { AuthUserInput } from './dto/signup-user-input';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from './decorators/current-user.decorator';
import { Login } from './types/logIn';
@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => User)
  signUp(@Args('signupUser') createUserInput: AuthUserInput) {
    return this.authService.singUp(createUserInput);
  }

  @Mutation(() => User, { name: 'singinUser' })
  async login(@Args('signInUserInput') signInUserInput: AuthUserInput) {
    return this.authService.logIn(signInUserInput);
  }

  @Query(() => String, { name: 'test' })
  @UseGuards(JwtAuthGuard)
  async hello(@CurrentUser() user: User) {
    return `hello 👋🏻 ${user.email}`;
  }
}
