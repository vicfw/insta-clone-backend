import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field(() => String)
  caption: string;
  @Field(() => String)
  image: string;

  @Field(() => Int)
  userId: number;
}
