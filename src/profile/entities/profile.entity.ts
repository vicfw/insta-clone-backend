import { ObjectType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';
import { Story } from 'src/story/entities/story.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Profile {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column('text', { nullable: true, default: 'default-profile.jpg' })
  profile_pic: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true, default: '' })
  name: string;

  @Field(() => [Story])
  @OneToMany(() => Story, (story) => story.profile)
  stories: Story;

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
