import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @IsString()
  @IsNotEmpty()
  readonly last_name: string;

  @IsString()
  @IsNotEmpty()
  readonly profile_picture: string;

  @IsEmail()
  readonly email: string;

  @IsStrongPassword()
  readonly password: string;
}
