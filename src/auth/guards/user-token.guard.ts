import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
@Injectable()
export class ValidateTokenExpired extends AuthGuard('jwt') {
  public handleRequest(err: any, user: any, info: Error): any {
    if (info) {
      if (info.name === 'TokenExpiredError') {
        console.log({ first: info.name, second: info.message });
        throw new UnauthorizedException('Token expired');
      }
    }
  }
}
