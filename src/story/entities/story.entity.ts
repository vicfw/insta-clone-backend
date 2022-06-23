import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Profile } from 'src/profile/entities/profile.entity';
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

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.stories)
  user: User;

  @Field(() => Profile, { nullable: true })
  @ManyToOne(() => Profile, (profile) => profile.stories)
  profile: Profile;

  @Field(() => Int)
  @Column()
  profileId: number;

  @Field(() => Int)
  @Column()
  userId: number;
}
