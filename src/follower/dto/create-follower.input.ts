import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateFollowerInput {
  @Field(() => Int)
  followerUserId: number;

  @Field(() => Int)
  userId: number;
}
