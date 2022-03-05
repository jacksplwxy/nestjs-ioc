
export class UsersService {
  getAllUsers(auth: string, userId: string) {
    if (auth !== 't:111111') return { code: 401, message: 'forbidden' };
    return {
      code: 200,
      message: 'success',
      data: {
        requester: userId,
        users: [
          { name: 'jacksplwxy', gender: 'male' },
          { name: 'xiaoya', gender: 'female' },
        ],
      },
    };
  }

  createUser(auth: string, name: string, gender: number) {
    if (auth !== 't:111111') return { code: 401, message: 'forbidden' };
    // handle psd
    return { code: 200, message: 'success', data: { name, gender } };
  }
}
