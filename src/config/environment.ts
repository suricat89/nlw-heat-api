export default {
  application: {
    port: Number.parseInt(process.env.PORT as string) || 3000,
  },
  jwt: {
    secret: process.env.JWT_SECRET as string,
  },
  authentication: {
    github: {
      web: {
        clientId: process.env.WEB_GITHUB_OAUTH_ID as string,
        clientSecret: process.env.WEB_GITHUB_OAUTH_SECRET as string,
      },
      mobile: {
        clientId: process.env.MOBILE_GITHUB_OAUTH_ID as string,
        clientSecret: process.env.MOBILE_GITHUB_OAUTH_SECRET as string,
      },
    },
  },
  database: {
    url: process.env.DATABASE_URL as string,
  },
  messages: {
    ammountGetMessages: Number.parseInt(process.env.AMMOUNT_GET_MESSAGES) || 3,
  },
};
