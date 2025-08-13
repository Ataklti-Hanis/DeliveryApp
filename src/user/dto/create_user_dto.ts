import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Matches(/^\+2519\d{8}$/, {
    message: 'Phone number must be ethiopia phone number',
  })
  phoneNumber: string;
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsInt()
  @Type(() => Number)
  role_id: number;
}
