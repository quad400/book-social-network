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
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { LoginResponse } from './response/auth.response';
import { Public } from '@app/common';



@ApiTags('Authentication')
@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Create User' })
  @ApiCreatedResponse()
  @Post('register')
  async register(@Body() data: CreateUserDto) {
    return await this.authService.create(data);
  }
  
  @Post('login')
  @ApiOperation({ summary: '' })
  @ApiBody({
    description: "Authenticate User",
    required: true,
    schema: {
      type: "object",
      properties: {
        username: {
          type: "string",
          example: "tester"
        },
        password: {
          type: "string",
          example: "test1234"
        }
      }
    }
  })
  @HttpCode(HttpStatus.OK)
  async login(@Body() data: LoginUserDto) {
    return await this.authService.login(data);
  }
  
  @Post('verify')
  @ApiOperation({ summary: 'Verify User Account' })
  @ApiOkResponse({ status: HttpStatus.OK })
  async verify(@Body() data: VerifyUserDto) {
    return await this.authService.verify(data);
  }
  
  @Post('resend-otp')
  @ApiOkResponse({ status: HttpStatus.OK })
  @ApiOperation({ summary: 'Resend Verification Code to User Email' })
  async regenerate(@Body() data: RegenrateOtpDto) {
    return await this.authService.regenerate(data);
  }
  
  @Post('change-password')
  @ApiOkResponse({ status: HttpStatus.OK })
  @ApiOperation({ summary: 'Change User Password' })
  async changePassword(@Body() data: ChangePasswordDto) {
    return await this.authService.changePassword(data);
  }
}
