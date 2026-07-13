import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Checks whether the user has a valid JWT token
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
