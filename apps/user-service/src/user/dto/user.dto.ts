import { UserRole } from '@app/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  full_name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  avatar?: string;

  @ApiProperty()
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email?: string;
}
