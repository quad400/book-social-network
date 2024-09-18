import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ChangePasswordDto,
  CreateUserDto,
  LoginUserDto,
  RegenrateOtpDto,
  VerifyUserDto,
} from './dto/auth.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginResponse } from './response/auth.response';

@ApiTags("Authentications")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({})
  @ApiCreatedResponse()
  @Post('register')
  async register(@Body() data: CreateUserDto) {
    return await this.authService.create(data);
  }
  
  // @Post('login')
  // @HttpCode(HttpStatus.OK)
  // @ApiOkResponse({type: LoginResponse, status: HttpStatus.OK})
  // async login(@Body() data: LoginUserDto) {
  //   return await this.authService.login(data);
  // }

  // @Post('verify')
  // async verify(@Body() data: VerifyUserDto) {
  //   return await this.authService.verify(data);
  // }

  // @Post('resend-otp')
  // async regenerate(@Body() data: RegenrateOtpDto) {
  //   return await this.authService.regenerate(data);
  // }

  // @Post('change-password')
  // async changePassword(@Body() data: ChangePasswordDto) {
  //   return await this.authService.changePassword(data);
  // }
}
