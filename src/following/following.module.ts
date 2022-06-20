import { Module } from '@nestjs/common';
import { FollowingService } from './following.service';
import { FollowingResolver } from './following.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Following } from './entities/following.entity';
import { FollowerModule } from 'src/follower/follower.module';

@Module({
  imports: [TypeOrmModule.forFeature([Following]), FollowerModule],
  providers: [FollowingResolver, FollowingService],
})
export class FollowingModule {}
