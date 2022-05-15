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
    const userHaveStory = await this.findOne(createStoryInput.userId);

    if (userHaveStory) {
      await this.update(createStoryInput.userId, createStoryInput);

      const story = {
        stories: [...userHaveStory.stories, createStoryInput.stories],
        userId: createStoryInput.userId,
      };
      return story;
    }

    const story = this.repo.create({
      stories: [createStoryInput.stories],
      userId: createStoryInput.userId,
    });

    await this.repo.save(story);
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
          stories: [...stories.stories, updateStoryInput.stories],
        },
      );
    }

    new BadRequestException();
  }

  remove(id: number) {
    return `This action removes a #${id} story`;
  }
}
