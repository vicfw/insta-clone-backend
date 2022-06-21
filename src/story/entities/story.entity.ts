import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Story {
  @Field({ nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String, { nullable: true })
  @Column('text')
  story: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.stories)
  user: User;

  @Field(() => Int)
  @Column()
  userId: number;
}
