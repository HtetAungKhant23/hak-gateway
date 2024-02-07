import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto, UpdateCartDto } from './dto/create-cart.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Roles } from 'src/auth/decorator/role.decorator';
import { ProductService } from 'src/product/product.service';
import { lastValueFrom } from 'rxjs';

@ApiTags('Cart')
@ApiBearerAuth()
@UseGuards(JwtGuard, RoleGuard)
@Roles('SuperAdmin')
@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly productService: ProductService,
  ) {}

  // ? for cart items gonna try with redis stack server to get experience with caching

  @Post()
  @ApiBody({
    type: CreateCartDto,
    description: 'create cart',
  })
  async create(
    @Body() dto: CreateCartDto,
    @Request() req: { user: { id: string; role: string } },
  ) {
    const newDto = [];
    for (let i = 0; i < dto.productId.length; i++) {
      // ? get unitPrice of product from product service
      const product = await lastValueFrom(
        await this.productService.findOne(dto.productId[i]),
      );
      newDto.push({
        productId: dto.productId[i],
        unitPrice: product.prod.unitPrice,
        quantity: dto.quantity[i],
      });
    }
    return this.cartService.create(newDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
