import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRegisterReqDto } from '../dtos/req/user-resgister-req.dto';
import { hash, compare } from 'bcryptjs';
import { UserService } from '../../users/services/user.service';
import { User } from '../../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserLoginReqDto } from '../dtos/req/user-login.req.dto';
@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async createApiToken(user: User) {
    return this.jwtService.sign({ user_id: user.user_id });
  }

  async registerUser(dto: UserRegisterReqDto) {
    let { email, password } = dto;
    password = await hash(password, 10);
    let createdUser = await this.userService.createUser({ email, password });
    let apiToken = await this.createApiToken(createdUser);
    return {
      api_token: apiToken,
    };
  }

  async loginUser(dto: UserLoginReqDto) {
    let { email, password } = dto;
    let user = await this.userService.findUserByEmail(email);
    let isPassMatch = await compare(password, user.password);
    if (!isPassMatch) {
      throw new UnauthorizedException('Wrong Password');
    }
    let apiToken = await this.createApiToken(user);
    return {
      api_token: apiToken,
    };
  }

  async validateToken(token: string) {
    return this.jwtService.verifyAsync(token);
  }

  async getUser(userId: number) {
    let user = await this.userService.findUserById(userId);
    delete user.password;
    return user;
  }
}
