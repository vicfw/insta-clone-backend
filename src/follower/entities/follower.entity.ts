import { ObjectType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @Field(() => GraphQLISODateTime)
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @Field(() => GraphQLISODateTime)
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
