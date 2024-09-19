import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from '../user/repository/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { AppConfig } from '@app/common';

@Module({
  imports: [
    JwtModule.register({
      secret: AppConfig.JWT_SECRET,
      global: true,
      signOptions: { expiresIn: AppConfig.JWT_EXPIRES_IN },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository],
})
export class AuthModule {}
