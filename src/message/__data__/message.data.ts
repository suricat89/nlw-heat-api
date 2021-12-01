export const messageData = {
  getLast: {
    response: {
      success: {
        last3Messages: {
          meta: {
            count: 3
          },
          records: [
            {
              text: 'Test message 4',
              user: {
                name: 'Test User 1',
                github_id: 2,
                avatar_url: 'https://github.com/suricat89.png',
                login: 'testUser1',
                profile: 'user'
              }
            },
            {
              text: 'Test message 3',
              user: {
                name: 'Test User 1',
                github_id: 2,
                avatar_url: 'https://github.com/suricat89.png',
                login: 'testUser1',
                profile: 'user'
              }
            },
            {
              text: 'Test message 2',
              user: {
                name: 'Test User 1',
                github_id: 2,
                avatar_url: 'https://github.com/suricat89.png',
                login: 'testUser1',
                profile: 'user'
              }
            }
          ]
        },
        singleMessage: {
          meta: {
            count: 1
          },
          records: [
            {
              text: 'Test message 4',
              user: {
                name: 'Test User 1',
                github_id: 2,
                avatar_url: 'https://github.com/suricat89.png',
                login: 'testUser1',
                profile: 'user'
              }
            }
          ]
        }
      }
    }
  },
  postMessage: {
    request: {
      SPM001: {
        message: {
          text: 'test message SPM001'
        }
      },
      EPM001: {
        message: {
          text: 'test message EPM001'
        }
      }
    },
    response: {
      success: {
        SPM001: {
          meta: {
            count: 1
          },
          records: [
            {
              text: 'test message SPM001',
              user: {
                name: 'Test User 1',
                github_id: 2,
                avatar_url: 'https://github.com/suricat89.png',
                login: 'testUser1',
                profile: 'user'
              }
            }
          ]
        }
      }
    }
  }
};
