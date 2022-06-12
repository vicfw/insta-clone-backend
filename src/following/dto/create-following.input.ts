import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFollowingInput {
  @Field(() => Int)
  followedUserId: number;

  @Field(() => Int)
  userId: number;
}
