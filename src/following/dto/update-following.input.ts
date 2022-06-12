import { CreateFollowingInput } from './create-following.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFollowingInput extends PartialType(CreateFollowingInput) {
  @Field(() => Int)
  id: number;
}
