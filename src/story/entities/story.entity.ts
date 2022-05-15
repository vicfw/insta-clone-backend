import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Story {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => [String])
  @Column('text', { array: true })
  stories: string[];

  @Field(() => User)
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Field(() => Int)
  @Column()
  userId: number;
}
