import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateSubCategoryDto } from './dto/create-sub-category.tdo';
import { UpdateSubCategoryDto } from './dto/update-sub-categories.dto';
import { SubCategoriesService } from './sub-categories.service';

@Controller('sub-categories')
export class SubCategoriesController {
  constructor(private readonly subCategoryService: SubCategoriesService) {}

  @Post()
  create(@Body() createSubCategoryDto: CreateSubCategoryDto) {
    return this.subCategoryService.create(createSubCategoryDto);
  }

  @Get()
  getAll() {
    return this.subCategoryService.getAll();
  }

  @Get('/:id')
  getOne(@Param('id') id: number) {
    return this.subCategoryService.getOne(id);
  }

  @Put('/:id')
  update(
    @Param('id') id: number,
    @Body() updateSubCategoryDto: UpdateSubCategoryDto,
  ) {
    return this.subCategoryService.update(id, updateSubCategoryDto);
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.subCategoryService.delete(id);
  }
}
