import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from 'src/dtos/signin.dto';
import { ReqUser } from 'src/modules/users/user.decorator';
import { User } from 'src/modules/users/user.inteface';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() dto: SignInDto) {
    console.log('dto', dto);
    return this.authService.signIn(dto.username, dto.password);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  me(@ReqUser() user: User) {
    return user;
  }
}
