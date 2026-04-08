import {
  Body,
  Controller,
  Post,
  Req,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import type { Request } from 'express';
import { Public } from 'src/commons/custom-decorators/public';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
  @Public()
  @Post('login')
  login(@Body() dto: LoginDto, @Req() req: Request) {
    return this.authService.login(dto, req);
  }

  @Post('logout')
  logout(@Req() req: Request) {
    req.session.destroy((err) => {
      if (err) throw new InternalServerErrorException(err);
    });
    return { ok: true };
  }
}
