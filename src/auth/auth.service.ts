import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { IUser } from 'src/users/interfaces/user.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @Inject('USER_MODEL') private readonly userModel: Model<IUser>,
    private readonly jwtService: JwtService,
  ) {}

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);

    return token;
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;
    this.logger.debug(`Attemping to login user ${email}`);
    const user = await this.userModel.findOne({ email, password }).exec(); // TODO - Hash password

    if (!user) throw new UnauthorizedException("User doesn't exist");

    this.logger.debug(`User logged successfully ${email}`);
    delete user.password;
    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }
}
