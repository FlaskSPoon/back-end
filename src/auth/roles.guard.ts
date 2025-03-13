// import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
//       context.getHandler(),
//       context.getClass(),
//     ]);

//     if (!requiredRoles) {
//       return true; // Pas de restriction de rôle
//     }

//     const { user } = context.switchToHttp().getRequest();
//     if (!user || !requiredRoles.includes(user.role)) {
//       throw new ForbiddenException("Accès refusé : permission insuffisante");
//     }

//     return true;
//   }
// }
