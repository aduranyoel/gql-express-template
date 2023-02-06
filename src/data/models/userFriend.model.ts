import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import User from './user.model';

@Table({
  tableName: 'user_friend'
})
export default class UserFriend extends Model {

  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => User)
  @Column
  friendId: number;

}
