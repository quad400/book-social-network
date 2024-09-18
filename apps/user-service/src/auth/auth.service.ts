import * as bcrypt from 'bcrypt';
import { HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../user/repository/user.repository';
import { CreateUserDto } from './dto/auth.dto';
import { BaseResponse } from '@app/common';
import { generateCode } from './utils';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async create({ email, full_name, password }: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);

    const code = generateCode();
    password = await bcrypt.hash(password, salt);
    const user = await this.userRepository.create({
      document: { full_name, email, password },
      uniqueField: "email"
    });
    user.token = code;
    user.token_expiry_date = new Date(Date.now() + 1000 * 60 * 1);

    await this.userRepository.save(user);
    // await this.createUserQueue.add({ code, user });
    return BaseResponse.success(
      null,
      'User created successfully',
      HttpStatus.CREATED,
    );
  }
}
