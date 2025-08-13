import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './create_user_entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create_user_dto';
import * as bcrypt from 'bcryptjs';
import { plainToInstance } from 'class-transformer';
import { Role } from 'src/roles/roles_entity';
import { LoginDto } from 'src/auth/dto/login_dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const role = await this.roleRepository.findOneBy({ id: userDto.role_id });
    if (!role) {
      throw new Error('Role not found');
    }
    const hashedPassword = await bcrypt.hash(userDto.password, salt);
    const user = this.userRepository.create({
      firstName: userDto.firstName,
      lastName: userDto.lastName,
      phoneNumber: userDto.phoneNumber,
      email: userDto.email,
      password: hashedPassword,
      role,
    });
    const savedUser = await this.userRepository.save(user);
    return plainToInstance(User, savedUser);
  }

  async findOne(loginDto: LoginDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
      relations: ['role'], // <-- include role in query
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
