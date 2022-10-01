import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLFormattedError, ValidationContext } from 'graphql';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { StoryModule } from './story/story.module';
import { UploadModule } from './upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ProfileModule } from './profile/profile.module';
import { FollowingModule } from './following/following.module';
import { FollowerModule } from './follower/follower.module';
import { PostModule } from './post/post.module';
import { decode } from './utils/jwt';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req, res }) => {
        const token = req.headers.cookie?.split('=')[1] as string | null;

        const user = token ? decode(token) : null;

        // // Attach the user object to the request object
        if (user) {
          req.user = user;
        }
        return { req, res };
      },
      sortSchema: true,
      autoTransformHttpErrors: true,
      cors: {
        credentials: true,
        origin: ['http://localhost:3001'],
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'instagram',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    ConfigModule.forRoot(),
    UsersModule,
    StoryModule,
    UploadModule,
    ProfileModule,
    FollowingModule,
    FollowerModule,
    PostModule,
  ],
  providers: [],
})
export class AppModule {}
