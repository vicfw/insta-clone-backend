import { CreateProfileInput } from './create-profile.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class UpdateProfileInput extends PartialType(CreateProfileInput) {
  @Field(() => Int)
  @IsNumber()
  id: number;
  @Field(() => String)
  @IsString()
  profile_pic: string;
}
