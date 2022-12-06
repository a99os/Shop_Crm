import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Categories } from '../categories/categories.model';
import { SubCategory } from '../sub-categories/sub-category.model';
import { CreateProductsDto } from './dto/create-products.dto';
import { UpdateProductsDto } from './dto/update-products.dto';
import { Products } from './products.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products) private productsRepository: typeof Products,
    @InjectModel(SubCategory) private subcategorRepository: typeof SubCategory,
  ) {}

  async create(createProductsDto: CreateProductsDto) {
    if (
      !(await this.subcategorRepository.findByPk(
        createProductsDto.sub_category_id,
      ))
    ) {
      throw new HttpException(
        'Bunday id da sub-category yo`q',
        HttpStatus.NOT_FOUND,
      );
    }
    return await this.productsRepository.create(createProductsDto);
  }

  async update(id: number, updateProductsDto: UpdateProductsDto) {
    console.log(updateProductsDto);
    const product = await this.productsRepository.findByPk(id);
    if (!product) {
      throw new HttpException('Bunday product topilmadi', HttpStatus.NOT_FOUND);
    }

    if (
      updateProductsDto.sub_category_id &&
      !(await this.subcategorRepository.findByPk(
        updateProductsDto.sub_category_id,
      ))
    ) {
      throw new HttpException(
        'Bunday id da sub-category yo`q',
        HttpStatus.NOT_FOUND,
      );
    }

    product.sub_category_id =
      updateProductsDto.sub_category_id || product.sub_category_id;
    product.model = updateProductsDto.model || product.model;
    product.product_name =
      updateProductsDto.product_name || product.product_name;
    product.color = updateProductsDto.color || product.color;
    product.price = updateProductsDto.price || product.price;

    await product.save();
    return product;
  }

  async delete(id: number) {
    const product = await this.productsRepository.findByPk(id);
    if (!product) {
      throw new HttpException('Bunday product topilmadi', HttpStatus.NOT_FOUND);
    }

    await this.productsRepository.destroy({
      where: {
        product_id: id,
      },
    });

    return product;
  }

  async getProduct(body) {
    console.log(body);
    let products = [];
    if (
      Object.keys(body).length == 1 &&
      Object.keys(body).includes('categoryId')
    ) {
      products = await this.productsRepository.findAll({
        include: {
          model: SubCategory,
          where: {
            category_id: body.categoryId,
          },
        },
      });
    } else if (
      Object.keys(body).length == 1 &&
      Object.keys(body).includes('subCategoryId')
    ) {
      products = await this.productsRepository.findAll({
        where: {
          sub_category_id: body.subCategoryId,
        },
        include: {
          all: true,
        },
      });
    } else if (
      Object.keys(body).length == 2 &&
      Object.keys(body).includes('subCategoryId') &&
      Object.keys(body).includes('model')
    ) {
      products = await this.productsRepository.findAll({
        where: {
          sub_category_id: body.subCategoryId,
          model: body.model,
        },
        include: {
          all: true,
        },
      });
    } else if (
      Object.keys(body).length == 1 &&
      Object.keys(body).includes('model')
    ) {
      products = await this.productsRepository.findAll({
        where: {
          model: body.model,
        },
        include: {
          all: true,
        },
      });
    }
    return products;
  }

  async getOne(id: number) {
    const product = await this.productsRepository.findByPk(id, {
      include: { all: true },
    });
    if (!product) {
      throw new HttpException(
        "Bunday id da product yo'q",
        HttpStatus.NOT_FOUND,
      );
    }
    return product;
  }
}
