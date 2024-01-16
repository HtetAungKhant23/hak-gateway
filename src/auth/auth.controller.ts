import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateAuthDto } from './dto/create.auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiBody({
    type: CreateAuthDto,
  })
  create(@Body() dto: CreateAuthDto) {
    return this.authService.create(dto);
  }
}
