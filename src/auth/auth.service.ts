import { Injectable } from '@nestjs/common';
import { User } from 'src/user/create_user_entity';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login_dto';
import * as bcrypt from 'bcryptjs';
import { plainToInstance } from 'class-transformer';
@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signin(loginDto: LoginDto): Promise<User> {
    const user = await this.userService.findOne(loginDto);

    const passwordMatch = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!passwordMatch) {
      throw new Error('Invalid credentials');
    }

    return plainToInstance(User, user, { excludeExtraneousValues: false });
  }
}
