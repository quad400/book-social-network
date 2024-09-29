import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './repository/user.repository';
import { ProfileRepository } from './repository/profile.repository';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UserRepository, ProfileRepository],
})
export class UserModule {}
