import * as bcrypt from 'bcrypt';
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../user/repository/user.repository';
import {
  ChangePasswordDto,
  CreateUserDto,
  LoginUserDto,
  RegenrateOtpDto,
  VerifyUserDto,
} from './dto/auth.dto';
import { BaseResponse } from '@app/common';
import { generateCode } from './utils';
import { BusinessCode } from '@app/common/enum';
import { JwtService } from '@nestjs/jwt';
import { TokenRepository } from '../user/repository/token.repository';
import { User } from '../user/model/user.model';
import { ProfileRepository } from '../user/repository/profile.repository';
import { Types } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenRepository: TokenRepository,
    private readonly profileRepository: ProfileRepository,
    private jwtService: JwtService,
  ) {}

  async create(data: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);

    const code = generateCode();
    data.password = await bcrypt.hash(data.password, salt);

    await this.userRepository.checkUnique(data, 'username');

    await this.userRepository.checkUnique(data, 'email');

    const user = await this.userRepository.create(data);
    const profile = await this.profileRepository.create({ user: user._id });

    user.profile = profile;
    await user.save();

    await this.tokenRepository.create({
      token: code,
      token_expired_at: new Date(Date.now() + 1000 * 60 * 3),
      user: user.id,
    });

    // await this.createUserQueue.add({ code, user });
    return BaseResponse.success({
      businessCode: BusinessCode.CREATED,
      businessDescription: 'User created successfully',
    });
  }

  async login({ email, username, password }: LoginUserDto) {
    let user: User;

    if (email) {
      user = await this.userRepository.findOneWithPassword({ email });
      if (!user.account_verified) {
        throw new BadRequestException('Account not verified');
      }
    } else {
      user = await this.userRepository.findOneWithPassword({ username });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestException('Invalid credentials');
    }

    const token = this.jwtService.sign({ sub: user });
    return BaseResponse.success({
      businessCode: BusinessCode.OK,
      businessDescription: 'User successfully login',
      data: token,
    });
  }

  async verify({ email, code, type }: VerifyUserDto) {
    const user = await this.userRepository.findOneWithPassword({ email });

    const token = await this.tokenRepository.findOne({ user: user.id });

    if (token.token_expired_at < new Date()) {
      throw new BadRequestException('Otp code has expired');
    }

    if (token.token !== code) {
      throw new BadRequestException('Invalid otp code');
    }
    if (type === 'REGISTER') {
      user.account_verified = true;
      await user.save();
    }
    await this.tokenRepository.delete({ pk: token.pk });

    const access_token = this.jwtService.sign({ sub: user });

    return BaseResponse.success({
      businessCode: BusinessCode.OK,
      businessDescription: 'Account Verified Successfully',
      data: access_token,
    });
  }

  async regenerate({ email }: RegenrateOtpDto) {
    const user = await this.userRepository.findOneWithPassword({ email });
    const token = await this.tokenRepository.findOne({ user: user.id });
    await this.tokenRepository.delete({ pk: token.pk });

    const code = generateCode();

    await this.tokenRepository.create({
      document: {
        token: code,
        token_expired_at: new Date(Date.now() + 1000 * 60 * 3),
        user: user.id,
      },
    });

    // await this.createUserQueue.add({ code, user });

    return BaseResponse.success({
      businessCode: BusinessCode.OK,
      businessDescription: 'Otp code generated successfully',
    });
  }

  async changePassword({
    email,
    confirm_password,
    password,
  }: ChangePasswordDto) {
    const user = await this.userRepository.findOneWithPassword({ email });

    if (password !== confirm_password) {
      throw new BadRequestException('Password Mismatch');
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    return BaseResponse.success({
      businessCode: BusinessCode.OK,
      businessDescription: 'Password changed successfully',
    });
  }
}
