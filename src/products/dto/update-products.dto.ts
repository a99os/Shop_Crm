import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateProductsDto {
  @IsOptional()
  @IsNumber()
  readonly sub_category_id: string;
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
  @IsString()
  readonly price: string;
}