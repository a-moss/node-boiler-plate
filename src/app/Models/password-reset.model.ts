import {
  Table, Column, Model, DataType,
} from 'sequelize-typescript';

@Table({
  underscored: true,
  tableName: 'password_resets',
})
export default class PasswordReset extends Model {
  @Column(DataType.STRING)
  email: string;

  @Column(DataType.STRING)
  token: string;

  @Column(DataType.DATE)
  expiresAt: number;
}
