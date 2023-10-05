import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ValidateTokenExpired } from '../guards/user-token.guard';

export function Auth() {
  return applyDecorators(UseGuards(ValidateTokenExpired, AuthGuard()));
}
