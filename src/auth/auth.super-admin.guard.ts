import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { AdminRole } from 'src/lib/constants';

@Injectable()
export class SuperAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || user.role !== AdminRole.SUPERADMIN) {
      throw new ForbiddenException(
        'Access denied. Only Super Admins can perform this action.',
      );
    }

    return true;
  }
}
