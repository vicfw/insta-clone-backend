import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { SaveCurrentUser } from './interceptors/auth.interceptor';
import { ProfileService } from 'src/profile/profile.service';
import { ProfileModule } from 'src/profile/profile.module';
import { Profile } from 'src/profile/entities/profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'hwdasdwd1231',
      signOptions: { expiresIn: '3d' },
    }),
    forwardRef(() => ProfileModule),
  ],
  providers: [
    UsersResolver,
    UsersService,
    AuthService,
    JwtStrategy,
    SaveCurrentUser,
  ],
  exports: [UsersService],
})
export class UsersModule {}
