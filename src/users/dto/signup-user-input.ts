import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  minLength,
} from 'class-validator';

@InputType()
export class AuthUserInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  username: string;

  @Field()
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter a valid email' })
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @Length(6, 100)
  password: string;
}
