import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from '../../users/services/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService:UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:'sdfsd&^sdgdf'
    });
  }

  async validate(payload: any) {
  let {user_id} = payload;
  let user = await this.userService.findUserById(user_id);
   delete user.password;
   return user;
  }
}