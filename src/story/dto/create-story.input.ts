import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateStoryInput {
  @Field(() => String)
  stories: string;

  @Field(() => Int)
  userId: number;
}
