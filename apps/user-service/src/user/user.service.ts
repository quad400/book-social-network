import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { BaseResponse } from '@app/common';
import { BusinessCode } from '@app/common/enum';
import { UpdateUserDto } from './dto/user.dto';
import { Types } from 'mongoose';
import { ProfileRepository } from './repository/profile.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly profileRepository: ProfileRepository,
  ) {}

  async updateMe(data: UpdateUserDto, pk: string) {
    const user = await this.userRepository.findById(pk);
    await this.profileRepository.findOneAndUpdate(
      { pk: user.profile.pk },
      data,
    );

    if(user.account_blocked){
      throw new UnauthorizedException("Account has been blocked")
    }
    return BaseResponse.success({
      businessCode: BusinessCode.OK,
      businessDescription: 'User Account Updated Successfully',
    });
  }

  async getMe(userId: string) {
    const user = await this.userRepository.findById(userId);

    if(user.account_blocked){
      throw new UnauthorizedException("Account has been blocked")
    }
    return BaseResponse.success({
      businessCode: BusinessCode.OK,
      businessDescription: 'User Account Fetch Successfully',
      data: user,
    });
  }

  async blockUnblockUserAccount(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (user.account_blocked) {
      await this.userRepository.findOneAndUpdate(
        { pk: user.pk },
        { account_blocked: false },
      );
      return BaseResponse.success({
        businessCode: BusinessCode.OK,
        businessDescription: 'User Account UnBlocked',
      });
    } else {
      await this.userRepository.findOneAndUpdate(
        { pk: user.pk },
        { account_blocked: true },
      );
      return BaseResponse.success({
        businessCode: BusinessCode.OK,
        businessDescription: 'User Account Blocked',
      });
    }
  }
}
