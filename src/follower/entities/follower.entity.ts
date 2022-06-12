import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Follower {
  @Field(() => Int)
  @Column()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  followerUserId: number;

  @ManyToOne(() => User, (user) => user.follower)
  user: User;

  @Field(() => Int)
  @Column()
  userId: number;
}
