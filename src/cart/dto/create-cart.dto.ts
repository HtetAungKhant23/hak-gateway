import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCartDto {
  @ApiProperty({ example: ['79f32126-f5cd-4cfb-8d1f-2fca40efa776'] })
  @IsNotEmpty()
  productId: string[];

  @ApiProperty()
  @IsNotEmpty()
  quantity: number[];
}

export class UpdateCartDto extends CreateCartDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cartId: string;
}
