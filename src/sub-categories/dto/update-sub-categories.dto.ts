import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateSubCategoryDto {
  @IsOptional()
  @IsNumber()
  readonly category_id: number;
  @IsOptional()
  @IsString()
  readonly sub_category_name: string;
}
