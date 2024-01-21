import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCartDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

export class UpdateCartDto extends CreateCartDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cartId: string;
}
