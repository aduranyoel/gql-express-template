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

  @Is('gender', isValidGender)
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

function isValidGender(value: string) {
  const isUserGender = Object.values(UserGender).some(gender => gender === value);
  if (!isUserGender) {
    throw new Error(`${value} is not a UserGender`);
  }
}
