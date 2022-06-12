import { Test, TestingModule } from '@nestjs/testing';
import { FollowerResolver } from './follower.resolver';
import { FollowerService } from './follower.service';

describe('FollowerResolver', () => {
  let resolver: FollowerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FollowerResolver, FollowerService],
    }).compile();

    resolver = module.get<FollowerResolver>(FollowerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
