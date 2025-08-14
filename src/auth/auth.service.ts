import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/create_user_entity';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login_dto';
import * as bcrypt from 'bcryptjs';
import { plainToInstance } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signin(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.userService.findOne(loginDto);

    const passwordMatch = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (passwordMatch) {
      const payload = {
        email: user.email,
        sub: user.id,
        roles: user.role.map((role) => role.name),
      };

      return {
        accessToken: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException('password does not match');
    }

    // return plainToInstance(User, user, { excludeExtraneousValues: false });
  }
}
