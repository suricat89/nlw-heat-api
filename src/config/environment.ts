export default {
  application: {
    port: Number.parseInt(process.env.PORT as string) || 3000,
  },
  jwt: {
    secret: process.env.JWT_SECRET as string,
  },
  authentication: {
    front: {
      id: process.env.FRONT_GITHUB_OAUTH_ID as string,
      secret: process.env.FRONT_GITHUB_OAUTH_SECRET as string,
    },
    mobile: {
      id: process.env.MOBILE_GITHUB_OAUTH_ID as string,
      secret: process.env.MOBILE_GITHUB_OAUTH_SECRET as string,
    },
    github: {
      id: process.env.GITHUB_OAUTH_ID as string,
      secret: process.env.GITHUB_OAUTH_SECRET as string,
    },
  },
  database: {
    url: process.env.DATABASE_URL as string,
  },
  messages: {
    ammountGetMessages: Number.parseInt(process.env.AMMOUNT_GET_MESSAGES) || 3,
  },
};
