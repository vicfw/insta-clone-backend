import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { getRepository, Repository } from 'typeorm';
import { CreateStoryInput } from './dto/create-story.input';
import { UpdateStoryInput } from './dto/update-story.input';
import { Story } from './entities/story.entity';

@Injectable()
export class StoryService {
  constructor(@InjectRepository(Story) private repo: Repository<Story>) {}

  async create(createStoryInput: CreateStoryInput) {
    const story = this.repo.create({
      story: createStoryInput.story,
      userId: createStoryInput.userId,
    });

    await this.repo.save(story);

    // setTimeout(() => {
    //   this.remove(story.id);
    // }, 60000);

    return story;
  }

  async findStoriesById(id: number) {
    const stories = await this.repo.findOne(
      { userId: id },
      { relations: ['user'] },
    );

    return stories;
  }

  async findOne(id: number): Promise<Story> {
    return await this.repo.findOne(id);
  }

  async update(id: number, updateStoryInput: UpdateStoryInput) {
    const stories = await this.findOne(updateStoryInput.userId);

    if (stories) {
      return await this.repo.update(
        { userId: id },
        {
          story: updateStoryInput.stories,
        },
      );
    }

    new BadRequestException();
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
