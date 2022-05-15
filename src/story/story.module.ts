import { Module } from '@nestjs/common';
import { StoryService } from './story.service';
import { StoryResolver } from './story.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Story } from './entities/story.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Story])],
  providers: [StoryResolver, StoryService],
})
export class StoryModule {}
