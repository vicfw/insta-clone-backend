import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { AuthService } from './auth.service';
import { AuthUserInput } from './dto/signup-user-input';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { CurrentUser } from './decorators/current-user.decorator';
import { Request, response, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { SignInUserInput } from './dto/signin-user-input';
import { AuthGuard } from './guard/auth.guard';
import { SaveCurrentUser } from './interceptors/auth.interceptor';
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
  @UseInterceptors(SaveCurrentUser)
  async login(
    @Args('signInUserInput') signInUserInput: SignInUserInput,
    @Context('res') res: Response,
  ) {
    return this.authService.logIn(signInUserInput, res);
  }

  @Query(() => User, { name: 'getCurrentUser' })
  @UseInterceptors(SaveCurrentUser)
  @UseGuards(AuthGuard)
  async getCurrentUser(@CurrentUser() user: User) {
    return this.usersService.findOne(user.id);
  }

  @Query(() => User, { name: 'getOneUser' })
  @UseInterceptors(SaveCurrentUser)
  @UseGuards(AuthGuard)
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @Query(() => User, { name: 'getOneUserByUsername' })
  @UseInterceptors(SaveCurrentUser)
  @UseGuards(AuthGuard)
  async findOneByUserName(
    @Args('username', { type: () => String }) username: string,
  ) {
    console.log(username);

    return this.usersService.findOneByUserName(username);
  }
}
function UseFilters(HttpExceptionFilter: any) {
  throw new Error('Function not implemented.');
}

function HttpExceptionFilter(HttpExceptionFilter: any) {
  throw new Error('Function not implemented.');
}
