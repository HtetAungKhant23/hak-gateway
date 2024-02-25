import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginDto, SignupDto } from './dto/create.auth.dto';
import { JwtGuard } from './guard/jwt.guard';
import { RoleGuard } from './guard/role.guard';
import { Role_Enum, Roles } from './decorator/role.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiBody({ type: SignupDto })
  signup(@Body() dto: SignupDto) {
    return this.authService.signup(dto);
  }

  @Post('login')
  @ApiBody({ type: LoginDto })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get('check-permission')
  @ApiBearerAuth()
  @UseGuards(JwtGuard, RoleGuard)
  @Roles(Role_Enum.Admin)
  profile(@Request() req: { user: { id: string; role_id: string } }) {
    return this.authService.checkPermission(req.user.role_id);
  }
}
