import { CreateStoryInput } from './create-story.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateStoryInput extends PartialType(CreateStoryInput) {
  @Field(() => String)
  stories: string;

  @Field(() => Int)
  userId: number;
}
