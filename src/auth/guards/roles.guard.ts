import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserEntity } from 'src/users/user.entity';
import { User } from 'src/users/user.interface';
import { getConnection } from 'typeorm';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.getAllAndOverride<string[]>('roles', [context.getHandler(), context.getClass()]);

    const request = context.switchToHttp().getRequest();
    
    const user = request.user;

    // console.log('RoleGuard:', roles, user);

    return getConnection()
        .getRepository(UserEntity)
        .createQueryBuilder()
        .select("users")
        .from(UserEntity, "users")
        .where("users.id = :userId", {userId: user.id})
        .getOne()
        .then((user: User) => roles.indexOf(user.role) > -1)
  }
}
