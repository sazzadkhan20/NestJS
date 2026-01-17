import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY, Roles } from '../decorators/roles.decorator';
import { UserRole } from '../enums/user_role.enum';

// Workflow ->
// client request jwtauthguard validate token if validate then attached user in the request
// roleguard check required role user match the user role if match then
// process to controller or access but not forbidden exception throw

@Injectable()
export class RolesGuard implements CanActivate {
  // Reflector -> utility access metadata from roles decorator
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // retrieve metadata
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLE_KEY,
      [
        context.getHandler(), // method level
        context.getClass(), // class level
      ],
    );

    //if no role required for request
    if (!requiredRoles) {
      console.log('No Permission');
      return true;
    }
    // Requested User in the system may user,admin...
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    if (!user) throw new ForbiddenException('User not authenticated');
    const hasRequiredRole = requiredRoles.some((role) => role === user.role);
    if (!hasRequiredRole)
      throw new ForbiddenException('User not Permission to access');
    return true;
  }
}
