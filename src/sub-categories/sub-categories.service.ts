import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Categories } from '../categories/categories.model';
import { CreateSubCategoryDto } from './dto/create-sub-category.tdo';
import { UpdateSubCategoryDto } from './dto/update-sub-categories.dto';
import { SubCategory } from './sub-category.model';

@Injectable()
export class SubCategoriesService {
  constructor(
    @InjectModel(SubCategory) private subCategoryRepository: typeof SubCategory,
    @InjectModel(Categories) private categoryRepository: typeof Categories,
  ) {}

  async create(createSubCategoryDto: CreateSubCategoryDto) {
    const category = await this.categoryRepository.findByPk(
      createSubCategoryDto.category_id,
    );

    if (!category) {
      throw new HttpException(
        'Bunday id da category mavjud emas',
        HttpStatus.NOT_FOUND,
      ); //category_id category_id
    }

    const sub_category = await this.subCategoryRepository.findOne({
      where: { sub_category_name: createSubCategoryDto.sub_category_name },
    });
    if (sub_category) {
      throw new HttpException(
        'Bunday sub-category mavjud',
        HttpStatus.FORBIDDEN,
      );
    }
    return await this.subCategoryRepository.create(createSubCategoryDto);
  }

  async getAll() {
    return await this.subCategoryRepository.findAll({ include: { all: true } });
  }

  async getOne(id: number) {
    const sub_category = await this.subCategoryRepository.findByPk(id, {
      include: { all: true },
    });
    if (!sub_category) {
      throw new HttpException(
        'Bunday category topilmadi',
        HttpStatus.NOT_FOUND,
      );
    }

    return sub_category;
  }

  async update(id: number, updateSubCategoryDto: UpdateSubCategoryDto) {
    const sub_category = await this.subCategoryRepository.findByPk(id);
    if (!sub_category) {
      throw new HttpException(
        'Bunday sub-category topilmadi',
        HttpStatus.NOT_FOUND,
      );
    }

    const candidate = await this.subCategoryRepository.findOne({
      where: { sub_category_name: updateSubCategoryDto.sub_category_name },
    });

    if (candidate && id != candidate.sub_category_id) {
      throw new HttpException(
        'Bunday sub-category mavjud',
        HttpStatus.FORBIDDEN,
      );
    }
    const category = await this.categoryRepository.findByPk(
      updateSubCategoryDto.category_id || sub_category.category_id,
    );

    if (!category) {
      throw new HttpException(
        'Bunday id da category mavjud emas',
        HttpStatus.NOT_FOUND,
      );
    }

    sub_category.sub_category_name =
      updateSubCategoryDto.sub_category_name || sub_category.sub_category_name;
    sub_category.category_id =
      updateSubCategoryDto.category_id || sub_category.category_id;
    await sub_category.save();
    return sub_category;
  }

  async delete(id: number) {
    const sub_category = await this.subCategoryRepository.findByPk(id);
    if (!sub_category) {
      throw new HttpException(
        'Bunday sub-category topilmadi',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.subCategoryRepository.destroy({ where: { category_id: id } });
    return sub_category;
  }
}
