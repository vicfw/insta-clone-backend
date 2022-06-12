import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Following {
  @Field(() => Int)
  @Column()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  followedUserId: number;

  @ManyToOne(() => User, (user) => user.following)
  user: User;

  @Field(() => Int)
  @Column()
  userId: number;
}
