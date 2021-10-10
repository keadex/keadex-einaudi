import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { RoleType } from '../role-type.enum';
import { Role } from './jwt.strategy';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  handleRequest(err, jwtPayload, info, context) {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !jwtPayload || !isGranted(roles, jwtPayload.roles)) {
      throw err || new UnauthorizedException();
    }
    return jwtPayload;
  }
}

function isGranted(apiRoles: string[], userRoles: Role[]) {
  if (!Array.isArray(apiRoles) || !apiRoles.length) return true; //no restrictions on the API -> always granted
  if (!Array.isArray(userRoles) || !userRoles.length) return false; //no roles associated to the user -> never granted
  const userRolesString = userRoles.map((role) => role.name);
  if (userRolesString.indexOf(RoleType.ADMIN) != -1) return true; //admin can do everything -> always granted

  //check if the user has the role requested by the API
  const intersection = apiRoles.filter((value) =>
    userRolesString.includes(value),
  );
  return intersection.length != 0;
}
