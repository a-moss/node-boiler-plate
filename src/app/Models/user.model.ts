import {
  Table, Column, Model, DataType,
} from 'sequelize-typescript';

@Table({
  underscored: true,
  tableName: 'users',
})
export default class User extends Model {
  @Column(DataType.STRING)
  email: string;

  @Column(DataType.STRING)
  password: string;
}
