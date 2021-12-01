import { User } from '.prisma/client';

export const userData = {
  user: {
    nonExistingUser: {
      id: 'asdf1234',
      name: 'Non Existing User',
      github_id: 3,
      avatar_url: 'https://github.com/suricat89.png',
      login: 'nonExistingUser',
      profile: 'user'
    } as User,
    userWithAnotherProfile: {
      id: 'asdf1234',
      name: 'User with another Profile',
      github_id: 3,
      avatar_url: 'https://github.com/suricat89.png',
      login: 'userWithAnotherProfile',
      profile: 'anotherProfile'
    } as User
  },
  getProfile: {
    response: {
      success: {
        admin: (userId: string) => ({
          meta: { count: 1 },
          records: [
            {
              id: userId,
              name: 'Admin User 1',
              github_id: 1,
              avatar_url: 'https://github.com/suricat89.png',
              login: 'adminUser1',
              profile: 'admin'
            }
          ]
        }),
        nonAdmin: (userId: string) => ({
          meta: { count: 1 },
          records: [
            {
              id: userId,
              name: 'Test User 1',
              github_id: 2,
              avatar_url: 'https://github.com/suricat89.png',
              login: 'testUser1',
              profile: 'user'
            }
          ]
        })
      }
    }
  },
  postAuthenticate: {
    interceptorData: {
      SPUA003newUser: {
        name: 'New User 1',
        github_id: 9999,
        avatar_url: 'https://github.com/suricat89.png',
        login: 'newUser1',
        profile: 'user'
      } as User
    },
    request: {
      adminWebsite: {
        code: 'aaa',
        source: 'web'
      },
      nonAdminMobile: {
        code: 'aaa',
        source: 'mobile'
      },
      invalidSource: {
        code: 'aaa',
        source: 'invalidSource'
      },
      newUser: {
        code: 'aaa',
        source: 'web'
      }
    },
    response: {
      adminWebsite: (user: User) => ({
        user
      }),
      nonAdminMobile: (user: User) => ({
        user
      }),
      newUser: (user: User) => ({
        user
      })
    }
  }
};
