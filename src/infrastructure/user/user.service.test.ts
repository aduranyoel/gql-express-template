import UserModel from '../../data/models/user.model';
import UserFriend from '../../data/models/userFriend.model';
import { Page } from '../../domain/page';
import { User } from '../../domain/user';
import * as userService from './user.service';

describe('UserService', () => {

  let mockUser: User;

  beforeEach(() => {
    mockUser = {
      userId: 1,
      email: 'fake@test.com',
      firstname: 'john',
      lastname: 'doe',
      gender: 'M',
      imageUrl: 'https://www.fakeimage.com/john',
      createdAt: new Date(),
    };
  });

  test('should create a user', async () => {
    const createSpy = jest.spyOn(UserModel, 'create').mockReturnValue(mockUser);

    const result = await userService.create(mockUser);

    expect(createSpy).toHaveBeenCalledWith(mockUser);
    expect(result).toBe(mockUser);
  });

  test('should update a user', async () => {
    const updateSpy = jest.spyOn(UserModel, 'update').mockResolvedValue([1]);

    await userService.update(mockUser);

    expect(updateSpy).toHaveBeenCalledWith(mockUser, { where: { userId: mockUser.userId } });
  });

  test('should find a user by primary key', async () => {
    const findByPkSpy = jest.spyOn(UserModel, 'findByPk').mockResolvedValue(mockUser as UserModel);

    const result = await userService.findByPk(mockUser.userId);

    expect(findByPkSpy).toHaveBeenCalledWith(mockUser.userId);
    expect(result).toBe(mockUser);
  });

  test('should get the first user page', async () => {
    const findByPkSpy = jest.spyOn(UserModel, 'findAndCountAll').mockResolvedValue({ count: 1, rows: [mockUser] } as any);

    const userPage = await userService.getPage();

    expect(findByPkSpy).toHaveBeenCalledWith({
      offset: 0,
      limit: 10,
      include: [UserModel],
    });
    expect(userPage).toEqual(new Page(1, 10, 1, [mockUser]));
  });

  test('should get the second user page', async () => {
    const response: any = { count: 10, rows: Array(10).fill(mockUser) };
    const findByPkSpy = jest.spyOn(UserModel, 'findAndCountAll').mockResolvedValue(response);

    const userPage = await userService.getPage({ pageSize: 5, page: 2 });

    expect(findByPkSpy).toHaveBeenCalledWith({ offset: 5, limit: 5, include: [UserModel] });
    expect(userPage).toEqual(new Page(2, 5, 2, response.rows));
  });

  test('should add user friend', async () => {
    const createUserFriendSpy = jest.spyOn(UserFriend, 'create').mockResolvedValue(null);
    const userFriendParams = { userId: 1, friendId: 2 };

    await userService.addFriend(userFriendParams);

    expect(createUserFriendSpy).toHaveBeenCalledWith(userFriendParams);
  });

  test('should not add user themself as friend', async () => {
    const createUserFriendSpy = jest.spyOn(UserFriend, 'create').mockResolvedValue(null);
    const userFriendParams = { userId: 1, friendId: 1 };

    await expect(() => userService.addFriend(userFriendParams)).rejects.toThrowError('Users cannot add themselves as friends');
    expect(createUserFriendSpy).not.toHaveBeenCalledWith(userFriendParams);
  });
});
