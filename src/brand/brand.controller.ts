import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/brand.dto';
import { Role_Enum, Roles } from 'src/auth/decorator/role.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Public } from 'src/auth/decorator';

@ApiTags('Brand')
@ApiBearerAuth()
@UseGuards(JwtGuard, RoleGuard)
@Roles(Role_Enum.SuperAdmin)
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  create(@Body() dto: CreateBrandDto) {
    return this.brandService.create(dto);
  }

  @Public()
  @Get()
  fetchAll() {
    return this.brandService.fetchAll();
  }

  @Public()
  @Get('id')
  fetchById(@Param('id') id: string) {
    return this.brandService.fetchDetail(id);
  }

  @Patch('id')
  update(@Param('id') id: string, @Body() dto: CreateBrandDto) {
    return this.brandService.update(id, dto);
  }

  @Delete('id')
  delete(@Param('id') id: string) {
    return this.brandService.delete(id);
  }
}
