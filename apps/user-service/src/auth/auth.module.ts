import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from '../user/repository/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { TokenRepository } from '../user/repository/token.repository';
import { ProfileRepository } from '../user/repository/profile.repository';
import { BullModule } from '@nestjs/bull';
import { Config } from '@app/common';

@Module({
  imports: [
    JwtModule.register({
      secret: Config.JWT_SECRET,
      global: true,
      signOptions: { expiresIn: Config.JWT_EXPIRES_IN },
    }),
    BullModule.registerQueue({
      name: Config.SEND_EMAIL_QUEUE,
      defaultJobOptions: {
        removeOnComplete: true,
        attempts:5,
        removeOnFail: true
      }
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, TokenRepository, ProfileRepository],
})
export class AuthModule {}
