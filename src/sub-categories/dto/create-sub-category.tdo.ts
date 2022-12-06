import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSubCategoryDto {
  @IsNumber()
  @IsNotEmpty()
  readonly category_id: number;
  @IsString()
  @IsNotEmpty()
  readonly sub_category_name: string;
}
