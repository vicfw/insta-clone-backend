import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateStoryInput {
  @Field(() => String)
  story: string;

  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  profileId: number;
}
