import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/user/create_user_entity';
import { CreateUserDto } from 'src/user/dto/create_user_dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login_dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}
  @Post('signup')
  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({ status: 201, description: 'return user in response' })
  signup(@Body() userDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(userDto);
  }

  @Post('signin')
  signin(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.signin(loginDto);
  }
}
