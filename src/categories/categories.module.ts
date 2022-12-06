import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Categories } from './categories.model';
import { SubCategory } from '../sub-categories/sub-category.model';
import { Products } from '../products/products.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Categories, SubCategory, Products])],
  providers: [CategoriesService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
