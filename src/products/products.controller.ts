import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { CreateProductsDto } from './dto/create-products.dto';
import { UpdateProductsDto } from './dto/update-products.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}
  @Post()
  create(@Body() createProductsDto: CreateProductsDto) {
    return this.productService.create(createProductsDto);
  }

  @Put('/:id')
  update(
    @Param('id') id: number,
    @Body() updateProductsDto: UpdateProductsDto,
  ) {
    return this.productService.update(id, updateProductsDto);
  }
}
