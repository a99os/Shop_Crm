import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { SubCategory } from '../sub-categories/sub-category.model';

interface CategoryCreateAttr {
  category_name: string;
}

@Table({ tableName: 'categories' })
export class Categories extends Model<Categories, CategoryCreateAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  category_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  category_name: string;

  @HasMany(() => SubCategory)
  subCategories: SubCategory[];
}
