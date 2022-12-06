import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { SubCategory } from '../sub-categories/sub-category.model';

interface ProductsCreateAttr {
  sub_category_id: number;
  model: string;
  product_name: string;
  color: string;
  price: number;
}

@Table({ tableName: 'products' })
export class Products extends Model<Products, ProductsCreateAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  product_id: number;

  @ForeignKey(() => SubCategory)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  sub_category_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  model: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  product_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  color: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  price: number;
}
