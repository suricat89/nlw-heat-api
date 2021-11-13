import prismaClient from '../../../config/database';

export class GetUserById {
  async execute(userId: string) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: userId,
      },
    });

    return user;
  }
}
