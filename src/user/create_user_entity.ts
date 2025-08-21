import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Role } from 'src/roles/roles_entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'John',
    description: 'User first name',
  })
  @Column()
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'User last name',
  })
  @Column()
  lastName: string;

  @ApiProperty({
    example: '+251912345678',
    description: 'User phone number',
  })
  @Column()
  phoneNumber: string;

  @ApiProperty({
    example: 'B2yHh@example.com',
    description: 'User email',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'User password',
  })
  @Column()
  @Exclude()
  password: string;

  @ApiProperty({
    type: () => [Role],
    description: 'List of roles assigned to the user',
  })
  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  role: Role[];

  @ApiProperty({
    example: '2025-08-21T12:34:56.789Z',
    description: 'Date and time when the user was created',
  })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
