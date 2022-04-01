import { Field, ID, InterfaceType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InterfaceType()
export abstract class Login extends User {
  @Field()
  accessToken: string;
}
