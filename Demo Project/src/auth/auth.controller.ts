import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dtos/register.dto';
import { LoginDTO } from './dtos/login.dto';
import { RolesGuard } from './guards/roles.guard';
import { CurrentUser } from './decorators/current_user.decorator';
import { UserEntity } from './entities/user.entity';
import { JwtAuthGuard } from './guards/jwt_auth.guard';
import { Roles } from './decorators/roles.decorator';
import { UserRole } from './enums/user_role.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registration(@Body() registerDto: RegisterDTO) {
    return this.authService.registration(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDTO) {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  async refreshToken(refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  // protected route
  // current user route
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getUserProfile(@CurrentUser() user: any) {
    return user;
  }

  // protected route
  // admin create
  // role based Guard
  @Post('create-admin')
  @Roles(UserRole.ADMIN)
  // JwtAuthGuard -> check valid JWT token
  // RolesGuard -> check valid role user access
  @UseGuards(JwtAuthGuard, RolesGuard)
  async createAdmin(@Body() admin: RegisterDTO) {
    return this.authService.createAdmin(admin);
  }
}
