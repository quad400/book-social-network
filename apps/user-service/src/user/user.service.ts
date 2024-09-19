import { Injectable } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { BaseResponse } from '@app/common';
import { BusinessCode } from '@app/common/enum';
import { UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async updateMe(data: UpdateUserDto, userId: string) {
    await this.userRepository.findOneAndUpdate({ _id: userId }, data);

    return BaseResponse.success({
      businessCode: BusinessCode.OK,
      businessDescription: 'User Account Updated Successfully',
    });
  }

  async getMe(userId: string) {
    console.log(userId);
    const user = await this.userRepository.findById(userId);
    return BaseResponse.success({
      businessCode: BusinessCode.OK,
      businessDescription: 'User Account Fetch Successfully',
      data: user,
    });
  }
}
