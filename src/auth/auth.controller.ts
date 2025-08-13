import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/user/create_user_entity';
import { CreateUserDto } from 'src/user/dto/create_user_dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login_dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}
  @Post('signup')
  signup(@Body() userDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(userDto);
  }

  @Post('signin')
  signin(@Body() loginDto: LoginDto): Promise<User> {
    return this.authService.signin(loginDto);
  }
}
