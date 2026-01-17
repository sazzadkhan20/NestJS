import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDTO } from './dtos/register.dto';
import { UserRole } from './enums/user_role.enum';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dtos/login.dto';
import { access } from 'fs';
import { JwtService } from '@nestjs/jwt';
import { ref } from 'process';
import { NotFoundError } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  // current user
  async getUserById(id: number) {
    const user = await this.userEntity.findOneBy({ id: id });
    if (!user) throw new NotFoundException(`User not Found with id ${id}`);
    const { password, ...result } = user;
    return result;
  }
  async registration(registerDto: RegisterDTO) {
    const user = await this.userEntity.findOne({
      where: { email: registerDto.email },
    });

    if (user) throw new ConflictException('Email already Exist');
    const createUser = this.userEntity.create({
      email: registerDto.email,
      name: registerDto.name,
      password: await this.hashedPassword(registerDto.password),
      role: UserRole.USER,
    });
    const saveUser = await this.userEntity.save(createUser);
    const { password, ...result } = saveUser;
    return {
      saveUSer: result,
      message: 'Registration Confirm',
    };
  }

  async createAdmin(registerDto: RegisterDTO) {
    const user = await this.userEntity.findOne({
      where: { email: registerDto.email },
    });

    if (user) throw new ConflictException('Email already Exist');
    const createUser = this.userEntity.create({
      email: registerDto.email,
      name: registerDto.name,
      password: await this.hashedPassword(registerDto.password),
      role: UserRole.ADMIN,
    });
    const saveUser = await this.userEntity.save(createUser);
    const { password, ...result } = saveUser;
    return {
      result,
      message: 'Admin Registration Confirm',
    };
  }

  async login(loginDto: LoginDTO) {
    const user = await this.userEntity.findOne({
      where: { email: loginDto.email },
    });

    if (!user || !(await this.verifyPassword(loginDto.password, user.password)))
      throw new UnauthorizedException('Invalid User');

    //Generate Tokens
    const tokens = this.generateTokens(user);
    const { password, ...result } = user;
    return {
      user: result,
      tokens,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: 'refresh_secret',
      });
      const user = await this.userEntity.findOne({
        where: { id: payload.sub },
      });
      if (!user) throw new UnauthorizedException('Invalid User,Access deny');
      const accessToken = await this.generateAccessToken(user);
      return { accessToken };
    } catch (e) {
      throw new UnauthorizedException('Invalid Token');
    }
  }

  async hashedPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async verifyPassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  private generateTokens(user: UserEntity) {
    return {
      accessToken: this.generateAccessToken(user),
      refreshToken: this.generateRefreshToken(user),
    };
  }

  private generateAccessToken(user: UserEntity): string {
    // user -> email,id,role-> RBAC
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };
    return this.jwtService.sign(payload, {
      secret: 'jwt_secret', // use in .env file must
      expiresIn: '15m',
    });
  }

  private generateRefreshToken(user: UserEntity): string {
    const payload = {
      sub: user.id,
    };
    return this.jwtService.sign(payload, {
      secret: 'refresh_secret', // use in .env file must
      expiresIn: '7d',
    });
  }
}
