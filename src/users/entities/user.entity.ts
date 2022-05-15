import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Profile } from 'src/profile/entities/profile.entity';
import { Story } from 'src/story/entities/story.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
  @Column()
  username: string;

  @Field()
  @Column()
  password: string;

  @Field({ nullable: true })
  accessToken: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field(() => [Int], { nullable: true })
  @Column('int', { array: true, nullable: true })
  followers: number[];

  @Field(() => [Int], { nullable: true })
  @Column('int', { array: true, nullable: true })
  following: number[];

  @Field(() => Story, { nullable: true })
  @OneToOne(() => Story, (story) => story.user)
  story: Story;

  @Field(() => Profile, { nullable: true })
  @JoinColumn()
  @OneToOne(() => Profile)
  profile: Profile;

  @Field(() => Int, { nullable: true })
  @Column()
  profileId;
}
