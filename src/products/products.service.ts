import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductsDto } from './dto/create-products.dto';
import { Products } from './products.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products) private productsRepository: typeof Products,
  ) {}

  async create(createProductsDto: CreateProductsDto) {
    return await this.productsRepository.create(createProductsDto);
  }
}
