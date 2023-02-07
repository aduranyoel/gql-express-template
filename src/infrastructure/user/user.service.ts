import UserModel from '../../data/models/user.model';
import UserFriend from '../../data/models/userFriend.model';
import { Page } from '../../domain/page';
import { User } from '../../domain/user';
import { AddFriendParams, DEFAULT_PAGE_SIZE } from './user.utils';

export async function getPage(pageInfo?: Pick<Page<UserModel>, 'page' | 'pageSize'>): Promise<Page<UserModel>> {
  const { page = 1, pageSize = DEFAULT_PAGE_SIZE } = pageInfo || {};
  const { count, rows } = await UserModel.findAndCountAll({
    offset: (page - 1) * pageSize,
    limit: pageSize,
    include: [UserModel],
  });

  const totalPages = Math.max(Math.ceil(count / pageSize), 1);

  return new Page(page, pageSize, totalPages, rows);
}

export function findByPk(userId: UserModel['userId']): Promise<UserModel | null> {
  return UserModel.findByPk(userId);
}

export function create(user: Omit<User, 'userId'>): Promise<User> {
  return UserModel.create(user) as Promise<User>;
}

export async function update(user: User): Promise<void> {
  await UserModel.update(user, { where: { userId: user.userId } });
}

export async function addFriend(addFriend: AddFriendParams): Promise<void> {
  const { userId, friendId } = addFriend;

  if (userId === friendId) {
    throw new Error('Users cannot add themselves as friends');
  }

  await UserFriend.create({ userId, friendId });
}
