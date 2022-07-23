import { ObjectType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';
import { Profile } from 'src/profile/entities/profile.entity';
import { Story } from 'src/story/entities/story.entity';
import { Following } from 'src/following/entities/following.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Follower } from 'src/follower/entities/follower.entity';
import { Post } from 'src/post/entities/post.entity';

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
  stories: Story[] | null;

  @Field(() => Profile, { nullable: true })
  @JoinColumn()
  @OneToOne(() => Profile)
  profile: Profile;

  @Field(() => Int, { nullable: true })
  @Column()
  profileId;

  @Field(() => [Post], { nullable: true })
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[] | null;

  @Field(() => [Following])
  @OneToMany(() => Following, (following) => following.user)
  following: Following[];

  @Field(() => [Follower])
  @OneToMany(() => Follower, (follower) => follower.user)
  follower: Follower[];

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
