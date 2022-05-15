import { InputType, Int, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateProfileInput {
  @Field(() => String)
  @IsString()
  profile_pic: string;
}
