import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Categories } from '../categories/categories.model';
import { Products } from '../products/products.model';

interface SubCategoryCreateAttr {
  category_id: number;
  sub_category_name: string;
}

@Table({ tableName: 'sub_categories' })
export class SubCategory extends Model<SubCategory, SubCategoryCreateAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  sub_category_id: number;

  @ForeignKey(() => Categories)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  category_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  sub_category_name: string;

  @HasMany(() => Products)
  products: Products[];
}
