import { User } from '.prisma/client';
import { Service } from '../../common/Service';
import { GetUserById } from '../repository/internal/GetUserById';

export class ProfileUserService extends Service<User> {
  async execute(userId: string) {
    const user = await new GetUserById().execute(userId);

    return this.envelope(user);
  }
}
