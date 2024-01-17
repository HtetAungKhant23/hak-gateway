import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateAuthDto, LoginDto } from './dto/create.auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiBody({
    type: CreateAuthDto,
  })
  signup(@Body() dto: CreateAuthDto) {
    return this.authService.signup(dto);
  }

  @Post('login')
  @ApiBody({
    type: LoginDto,
  })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
