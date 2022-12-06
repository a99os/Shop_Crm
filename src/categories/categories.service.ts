import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SubCategory } from '../sub-categories/sub-category.model';
import { Categories } from './categories.model';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Categories) private categoryRepository: typeof Categories,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryRepository.findOne({
      where: { category_name: createCategoryDto.category_name },
    });
    if (category) {
      throw new HttpException('Bunday category mavjud', HttpStatus.FORBIDDEN);
    }
    return await this.categoryRepository.create(createCategoryDto);
  }

  async getAll() {
    return await this.categoryRepository.findAll({
      include: {
        model: SubCategory,
        attributes: ['sub_category_id', 'sub_category_name'],
      },
    });
  }

  async getOne(id: number) {
    const category = await this.categoryRepository.findByPk(id, {
      include: {
        model: SubCategory,
        attributes: ['sub_category_id', 'sub_category_name'],
      },
    });
    if (!category) {
      throw new HttpException(
        'Bunday category topilmadi',
        HttpStatus.NOT_FOUND,
      );
    }

    return category;
  }

  async update(id: number, createCategoryDto: CreateCategoryDto) {
    const candidate = await this.categoryRepository.findOne({
      where: { category_name: createCategoryDto.category_name },
    });
    if (candidate && id != candidate.id) {
      throw new HttpException('Bunday category mavjud', HttpStatus.FORBIDDEN);
    }

    const category = await this.categoryRepository.findByPk(id);
    if (!category) {
      throw new HttpException(
        'Bunday category topilmadi',
        HttpStatus.NOT_FOUND,
      );
    }
    category.category_name = createCategoryDto.category_name;
    await category.save();
    return category;
  }

  async delete(id: number) {
    const category = await this.categoryRepository.findByPk(id);
    if (!category) {
      throw new HttpException(
        'Bunday category topilmadi',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.categoryRepository.destroy({ where: { category_id: id } });
    return category;
  }
}
