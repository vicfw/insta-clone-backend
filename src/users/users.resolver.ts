import { UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CurrentUserId } from './decorators/current-user.decorator';
import { SignInUserInput } from './dto/signin-user-input';
import { AuthUserInput } from './dto/signup-user-input';
import { User } from './entities/user.entity';
import { AuthGuard } from './guards/auth.guards';
import { UsersService } from './users.service';
@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}
  @Mutation(() => User)
  signUp(@Args('signupUser') createUserInput: AuthUserInput): Promise<User> {
    return this.authService.singUp(createUserInput);
  }

  @Mutation(() => User, { name: 'singinUser' })
  async login(
    @Args('signInUserInput') signInUserInput: SignInUserInput,
    @Context('res') res: Response,
  ) {
    return this.authService.logIn(signInUserInput, res);
  }

  @Query(() => User, { name: 'getCurrentUser' })
  @UseGuards(AuthGuard)
  async getCurrentUser(@CurrentUserId() user: number) {
    return this.usersService.findOne(user);
  }

  @Query(() => User, { name: 'getOneUser' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Query(() => User, { name: 'getOneUserByUsername' })
  async findOneByUserName(
    @Args('username', { type: () => String }) username: string,
  ) {
    return this.usersService.findOneByUserName(username);
  }

  @Query(() => [User], { name: 'searchByUsername' })
  async searchByUsername(
    @Args('username', { type: () => String }) username: string,
  ) {
    return await this.usersService.searchByUsername(username);
  }
}
function UseFilters(HttpExceptionFilter: any) {
  throw new Error('Function not implemented.');
}

function HttpExceptionFilter(HttpExceptionFilter: any) {
  throw new Error('Function not implemented.');
}
