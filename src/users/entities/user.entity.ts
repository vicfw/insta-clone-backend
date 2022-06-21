import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Profile } from 'src/profile/entities/profile.entity';
import { Story } from 'src/story/entities/story.entity';
import { Following } from 'src/following/entities/following.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Follower } from 'src/follower/entities/follower.entity';

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column({ unique: true })
  username: string;

  @Field()
  @Column()
  password: string;

  @Field({ nullable: true })
  accessToken: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field(() => [Story], { nullable: true })
  @OneToMany(() => Story, (story) => story.user)
  stories: Story[];

  @Field(() => Profile, { nullable: true })
  @JoinColumn()
  @OneToOne(() => Profile)
  profile: Profile;

  @Field(() => Int, { nullable: true })
  @Column()
  profileId;

  @Field(() => [Following])
  @OneToMany(() => Following, (following) => following.user)
  following: Following[];

  @Field(() => [Follower])
  @OneToMany(() => Follower, (follower) => follower.user)
  follower: Follower[];
}
