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
import { AppConfig, BaseResponse } from '@app/common';
import { generateCode } from './utils';
import { LoginResponse } from './response/auth.response';
import { BusinessCode } from '@app/common/enum';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,

    private jwtService: JwtService,
  ) {}

  async create({ email, full_name, password }: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);

    const code = generateCode();
    password = await bcrypt.hash(password, salt);

    const user = await this.userRepository.create({
      document: { full_name, email, password },
      uniqueField: 'email',
    });
    user.token = code;
    user.token_expiry_date = new Date(Date.now() + 1000 * 60 * 1);

    await user.save();

    // await this.createUserQueue.add({ code, user });
    return BaseResponse.success({
      businessCode: BusinessCode.CREATED,
      businessDescription: 'User created successfully',
    });
  }

  async login({ email, password }: LoginUserDto) {
    const user = await this.userRepository.findOneWithPassword({ email });

    console.log(AppConfig.JWT_EXPIRES_IN)
    if (!user.is_verified) {
      throw new BadRequestException('Account not verified');
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
    const user = await this.userRepository.findOne({ email });

    if (user.token_expiry_date < new Date()) {
      throw new BadRequestException('Otp code has expired');
    }
    if (user.token !== code) {
      throw new BadRequestException('Invalid otp code');
    }
    if (type === 'REGISTER') {
      user.is_verified = true;
    }
    user.token = null;
    user.token_expiry_date = null;
    await user.save();

    const token = this.jwtService.sign({ sub: user });

    return BaseResponse.success({
      businessCode: BusinessCode.OK,
      businessDescription: 'Account Verified Successfully',
      data: token,
    });
  }

  async regenerate({ email }: RegenrateOtpDto) {
    const user = await this.userRepository.findOne({ email });

    const code = generateCode();
    user.token = code;
    user.token_expiry_date = new Date(Date.now() + 1000 * 60 * 1);

    await user.save();

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
    const user = await this.userRepository.findOne({ email });

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
