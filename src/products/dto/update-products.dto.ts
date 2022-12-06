import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateProductsDto {
  @IsOptional()
  @IsNumber()
  readonly sub_category_id: number;
  @IsOptional()
  @IsString()
  readonly model: string;
  @IsOptional()
  @IsString()
  readonly product_name: string;
  @IsOptional()
  @IsString()
  readonly color: string;
  @IsOptional()
  @IsNumber()
  readonly price: number;
}
