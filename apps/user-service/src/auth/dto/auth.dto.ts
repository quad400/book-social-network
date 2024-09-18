import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    full_name: string;
    
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(8)    
    password: string;
}

export class LoginUserDto {
    
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(8)    
    password: string;
}


export class VerifyUserDto{
    
    @ApiProperty()
    @IsEnum({REGISTER:"REGISTER",RESET_PASSWORD: "RESET_PASSWORD"})
    @IsNotEmpty()
    type: "REGISTER" | "RESET_PASSWORD"
    
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(4)
    code: string;
    
}

export class RegenrateOtpDto{
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;
}

export class ChangePasswordDto{
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    confirm_password: string;
}