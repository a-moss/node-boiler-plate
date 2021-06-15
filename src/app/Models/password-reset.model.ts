import {
  Table, Column, Model,
} from 'sequelize-typescript';

@Table({
  underscored: true,
  tableName: 'password_resets',
})
export default class PasswordReset extends Model {
  @Column
  email: string;

  @Column
  token: string;

  @Column
  expiresAt: number;
}
