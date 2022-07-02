import { ObjectType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';
import { Profile } from 'src/profile/entities/profile.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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
  @JoinColumn()
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
