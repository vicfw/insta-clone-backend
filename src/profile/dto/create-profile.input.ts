import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateProfileInput {
  @Field(() => String)
  @IsString()
  profile_pic: string;

  @Field(() => String)
  @IsString()
  name: string;
}
