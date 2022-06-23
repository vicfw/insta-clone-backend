import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Story } from 'src/story/entities/story.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
}
