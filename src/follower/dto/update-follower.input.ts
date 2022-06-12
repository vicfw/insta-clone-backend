import { CreateFollowerInput } from './create-follower.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFollowerInput extends PartialType(CreateFollowerInput) {
  @Field(() => Int)
  id: number;
}
