import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { InviteStaff, LoginDto, SignupDto } from './dto/create.auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('invite-staff')
  @ApiBody({ type: InviteStaff, description: 'invite staff' })
  InviteStaff(@Body() dto: InviteStaff) {
    return this.authService.invite(dto);
  }

  @Post('signup')
  @ApiBody({
    type: SignupDto,
  })
  signup(@Body() dto: SignupDto) {
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
