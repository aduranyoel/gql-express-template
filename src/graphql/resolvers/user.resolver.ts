import { Page } from '../../domain/page';
import { User } from '../../domain/user';
import { AddFriendParams } from '../../infrastructure/user.utils';
import * as userService from '../../infrastructure/user.service';

interface Input<T> {
  input: T;
}

interface UserInput {
  userId: User['userId'];
}

export default {
  Query: {
    users: (_root: any, { input }: Input<Pick<Page<User>, 'page' | 'pageSize'>>) => userService.getPage(input),
    user: (_root: any, { userId }: UserInput) => userService.findByPk(userId),
  },
  Mutation: {
    createUser: (_root: any, { input }: Input<Omit<User, 'userId'>>) => userService.create(input),
    updateUser: (_root: any, { input }: Input<User>) => userService.update(input),
    addUserFriend: (_root: any, { input }: Input<AddFriendParams>) => userService.addFriend(input),
  },
};
