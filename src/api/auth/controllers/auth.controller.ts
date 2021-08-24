import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';


import { UserLoginReqDto } from '../dtos/req/user-login.req.dto';
import { UserRegisterReqDto } from '../dtos/req/user-resgister-req.dto';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: UserRegisterReqDto) {
    return this.authService.registerUser(dto);
  }

  @Post('login')
  login(@Body() dto: UserLoginReqDto) {
    return this.authService.loginUser(dto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  userDetails(@Req() req: any) {
    return req.user;
   
  }
}
