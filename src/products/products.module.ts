import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Categories } from '../categories/categories.model';
import { SubCategory } from '../sub-categories/sub-category.model';
import { ProductsController } from './products.controller';
import { Products } from './products.model';
import { ProductsService } from './products.service';

@Module({
  imports: [SequelizeModule.forFeature([Categories, SubCategory, Products])],

  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
