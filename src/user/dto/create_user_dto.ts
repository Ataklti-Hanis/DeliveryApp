import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John', description: 'First name of the user' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    example: '+251912345678',
    description: 'Phone number (Ethiopian format only, starts with +2519...)',
  })
  @Matches(/^\+2519\d{8}$/, {
    message: 'Phone number must be a valid Ethiopian phone number',
  })
  phoneNumber: string;

  @ApiProperty({ example: 'john@example.com', description: 'Email address' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'StrongPassword123', description: 'User password' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: [1, 2],
    description: 'Array of role IDs assigned to the user',
    type: [Number],
  })
  @IsInt({ each: true })
  @Type(() => Number)
  role_ids: number[];
}
