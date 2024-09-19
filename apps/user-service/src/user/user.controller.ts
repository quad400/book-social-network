import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './model/user.model';
import { CurrentUser } from '@app/common';
import { UpdateUserDto } from './dto/user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch('update')
  @ApiOperation({ summary: 'Update User Information' })
  async updateMe(@Body() data: UpdateUserDto, @CurrentUser() user: User) {
    return await this.userService.updateMe(data, user.id);
  }
  
  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Fetch User Information using user token' })
  async getMe(@CurrentUser() userId: string) {
    return await this.userService.getMe(userId);
  }

  // @MessagePattern('get_user')
  // async getUserByIdService(@Payload() data: { userId: string }) {
  //   return await this.userService.getMe(data.userId);
  // }

  @Get('profile/:userId')
  @ApiOperation({ summary: 'Fetch User Information using user id' })
  async getUserProfile(@Param('userId') userId: string) {
    return await this.userService.getMe(userId);
  }
}
