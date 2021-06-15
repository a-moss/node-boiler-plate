import {
  Table, Column, Model,
} from 'sequelize-typescript';

@Table({
  underscored: true,
  tableName: 'users',
})
export default class User extends Model {
  @Column
  email: string;

  @Column
  password: string;
}
