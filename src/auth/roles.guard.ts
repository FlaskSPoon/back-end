import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    // console.log(' RolesGuard - User:', user);

    if (!user || !this.hasRequiredRole(user.role, requiredRoles)) {
      throw new ForbiddenException("Accès refusé : vous n'avez pas les permissions nécessaires");
    }

    return true;
  }

  private hasRequiredRole(userRole: string, requiredRoles: string[]): boolean {
   
   

    return requiredRoles.includes(userRole.toUpperCase()); 
  }
}
