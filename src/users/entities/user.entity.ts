import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  image_uri: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field(() => [Int], { nullable: true })
  @Column('int', { array: true, nullable: true })
  followers: number[];

  @Field(() => [Int], { nullable: true })
  @Column('int', { array: true, nullable: true })
  following: number[];
}
