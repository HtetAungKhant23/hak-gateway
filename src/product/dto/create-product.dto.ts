import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ required: false })
  name: string;

  @ApiProperty({ required: false })
  code: string;

  @ApiProperty({ required: false })
  dec: string;

  @ApiProperty({ required: false })
  categoryId: string;

  @ApiProperty({ required: false })
  brandId: string;

  @ApiProperty({ required: false })
  unitPrice: number;
}

export class UpdateProductDto extends CreateProductDto {}
