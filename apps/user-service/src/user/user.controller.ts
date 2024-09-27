import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './model/user.model';
import { CurrentUser } from '@app/common';
import { UpdateUserDto } from './dto/user.dto';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch('update')
  @ApiOperation({ summary: 'Update User Information' })
  async updateMe(@Body() data: UpdateUserDto, @CurrentUser() user: User) {
    return await this.userService.updateMe(data, user.pk);
  }

  @Get('me')
  @ApiOperation({ summary: 'Fetch User Information using user token' })
  async getMe(@CurrentUser() user: User) {
    return await this.userService.getMe(user.pk);
  }

  @ApiOperation({ description: 'Fetch User Information using user id' })
  @ApiParam({ name: 'userId', type: String, description: 'User ID' })
  @Get('profile/:userId')
  @ApiOperation({ summary: 'Fetch User Information using user id' })
  async getUserProfile(@Param('userId') userId: string) {
    return await this.userService.getMe(userId);
  }

  @ApiOperation({ description: 'Block User Account' })
  @ApiParam({ name: 'userId', type: String, description: 'User ID' })
  @Post('block-account/:userId')
  async blockUnblockUserAccount(@Param('userId') userId: string) {
    return await this.userService.blockUnblockUserAccount(userId)
  }
}
