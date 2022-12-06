import { Module } from '@nestjs/common';
import { SubCategoriesController } from './sub-categories.controller';
import { SubCategoriesService } from './sub-categories.service';
import { Categories } from '../categories/categories.model';
import { SubCategory } from '../sub-categories/sub-category.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Products } from '../products/products.model';

@Module({
  imports: [SequelizeModule.forFeature([Categories, SubCategory, Products])],

  controllers: [SubCategoriesController],
  providers: [SubCategoriesService],
})
export class SubCategoriesModule {}
