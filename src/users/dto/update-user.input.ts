import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  username: string;
  @Field(() => String, { nullable: true })
  description: string;
}
