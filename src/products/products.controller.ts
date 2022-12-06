import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductsDto } from './dto/create-products.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}
  @Post()
  create(@Body() createProductsDto: CreateProductsDto) {
    return this.productService.create(createProductsDto);
  }
}
