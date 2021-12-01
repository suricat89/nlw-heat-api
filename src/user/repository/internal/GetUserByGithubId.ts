import { prismaClient } from '../../../config/database';

export class GetUserByGithubId {
  async execute(githubId: number) {
    return prismaClient.user.findFirst({
      where: {
        github_id: githubId,
      },
    });
  }
}
