import { Module } from '@nestjs/common';
import { FollowerService } from './follower.service';
import { FollowerResolver } from './follower.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follower } from './entities/follower.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Follower])],
  providers: [FollowerResolver, FollowerService],
  exports: [FollowerService],
})
export class FollowerModule {}
