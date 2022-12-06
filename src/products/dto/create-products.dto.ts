import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductsDto {
  @IsNumber()
  @IsNotEmpty()
  readonly sub_category_id: string;
  @IsString()
  @IsNotEmpty()
  readonly model: string;
  @IsString()
  @IsNotEmpty()
  readonly product_name: string;
  @IsString()
  @IsNotEmpty()
  readonly color: string;
  @IsString()
  @IsNotEmpty()
  readonly price: string;
}
