import { CreateProfileInput } from './create-profile.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsInt, isInt, IsString } from 'class-validator';

@InputType()
export class UpdateProfileInput extends PartialType(CreateProfileInput) {
  @Field(() => Int)
  @IsInt()
  profile_id: number;

  @Field(() => Int)
  @IsInt()
  user_id: number;

  @Field(() => String, { nullable: true })
  profile_pic: string;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String)
  @IsString()
  username: string;

  @Field(() => String, { nullable: true })
  description: string;
}
