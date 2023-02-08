import {
  AllowNull, AutoIncrement,
  BelongsToMany,
  Column,
  DataType,
  Is,
  IsEmail,
  Model, PrimaryKey,
  Table,
  Unique
} from 'sequelize-typescript';
import UserFriend from './userFriend.model';

/**
 * Interface to specify the user gender
 */
export enum UserGender {
  MALE = 'M',
  FEMALE = 'F',
}

@Table({
  tableName: 'user',
})
export default class User extends Model {
  @AllowNull(false)
  @PrimaryKey
  @AutoIncrement
  @Column
  userId: number;

  @AllowNull(false)
  @Unique
  @IsEmail
  @Column
  email: string;

  @AllowNull(false)
  @Column
  firstname: string;

  @AllowNull(false)
  @Column
  lastname: string;

  @Is({ args: /[MF]/, msg: 'The value is not a valid gender, did you meant M or F?' })
  @AllowNull(false)
  @Column({
    type: DataType.CHAR,
  })
  gender: string;

  @AllowNull
  @Column
  imageUrl: string;

  @BelongsToMany(() => User, () => UserFriend, 'userId', 'friendId')
  friends: User[];

}
