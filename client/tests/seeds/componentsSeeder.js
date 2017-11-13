export default {
  addUser: {
    name: '',
    addUserError: null,
    addUserSuccess: false,
    groupState: {},
    groupId: ''
  },
  token: 'dummytokenstring',
  username: 'johadi',
  groupBoard: {
    groupMessages: {
      rows: [],
      metaData: {
        totalPages: 1,
        totalCount: 0
      }
    },
    groupId: '1',
    name: 'sport',
    newGroupMessages: {
      rows: [
        {
          id: 1,
          body: 'world apart',
          readersId: [5],
          createdAt: new Date(),
          User: {
            username: 'johadi'
          },
          Group: {
            id: '2',
            name: 'game of thrones'
          }
        },
        {
          id: 4,
          body: 'lord of the ring',
          readersId: [8],
          createdAt: new Date(),
          User: {
            username: 'ovenje'
          },
          Group: {
            id: '4',
            name: 'ferrari'
          }
        }
      ],
      metaData: {
        totalPages: 4,
        totalCount: 0
      }
    }
  },
  allGroups: {
    userGroups: {
      groups: [],
      metaData: {
        totalPages: 1,
        totalCount: 0
      }
    },
    newUserGroups: {
      groups: [
        {
          Group: {
            id: '2',
            name: 'twilight'
          }
        },
        {
          Group: {
            id: '4',
            name: 'jamboree'
          }
        }
      ],
      metaData: {
        totalPages: 3,
        totalCount: 20
      }
    }
  },
  groupUsers: {
    groupUsers: {
      users: [
        {
          User: {
            username: 'johadi',
            id: 5
          }
        }
      ],
      metaData: {
        totalPages: 1,
        totalCount: 3
      }
    },
    name: 'andela',
    groupId: '1',
    newGroupUsers: {
      users: [
        {
          User: {
            username: 'johadi',
            id: 5
          }
        },
        {
          User: {
            username: 'jimoh',
            id: 2
          }
        }
      ],
      metaData: {
        totalPages: 3,
        totalCount: 8
      }
    }
  },
  messageBoard: {
    boardMessages: {
      messages: [],
      metaData: {
        totalPages: 1,
        totalCount: 0
      }
    },
    newBoardMessages: {
      messages: [
        {
          id: 1,
          body: 'world apart',
          createdAt: new Date(),
          User: {
            username: 'johadi'
          },
          Group: {
            id: '2',
            name: 'andela'
          }
        },
        {
          id: 4,
          body: 'hmmmmm not easy',
          createdAt: new Date(),
          User: {
            username: 'ovenje'
          },
          Group: {
            id: '4',
            name: 'ferrari'
          }
        }
      ],
      metaData: {
        totalPages: 4,
        totalCount: 10
      }
    }
  },
  notification: {
    message: {
      User: {
        username: 'jimoh'
      },
      createdAt: new Date(),
      body: 'lord of the ring'
    },
    name: 'andela'
  },
  sendNotification: {
    groupId: '4',
    name: 'andela',
    priority: 'normal',
    firstMessage: '',
    secondMessage: 'hello'
  },
  userDetail: {
    username: 'johadi',
    fullname: 'jimoh hadi',
    mobile: '09087653456',
    email: 'jimoh@hadi.com'
  }
};
