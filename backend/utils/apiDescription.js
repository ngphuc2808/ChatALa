//comment out completed api

// USER

// const login = {
//   url: "api/user/login",
//   auth: false,
//   method: "POST",
//   req: {
//     phone: String,
//     password: String,
//   },
//   res: {
//     avatar: String,
//     banner: String,
//     name: String,
//   },
// };

// const register = {
//   url: "api/user/register",
//   auth: false,
//   method: "POST",
//   req: {
//     name: String,
//     phone: String,
//     password: String,
//   },
//   res: {
//     message: String,
//   },
// };

const findUser = {
  url: "api/user/find",
  auth: true,
  method: "POST",
  req: {
    nameOrPhone: String,
  },
  res: [
    {
      _id: String,
      avatar: String,
      banner: String,
      name: String,
      phone: String,
      gender: String,
      dob: String,
      isFriend: Boolean,
      createdAt: String,
      updatedAt: String,
    },
  ],
};

const editUserInfo = {
  url: "api/user/update",
  auth: true,
  method: "POST",
  req: {
    name: String,
    gender: String,
    dob: Date,
  },
  res: {
    name: String,
    gender: String,
    dob: Date,
  },
};

const friendRequest = {
  url: "api/user/friend-request/:id",
  auth: true,
  method: "POST",
  req: {},
  res: {
    message: String,
  },
};

const friendAccept = {
  url: "api/user/friend-request/:id/accept",
  auth: true,
  method: "POST",
  req: {},
  res: {
    message: String,
  },
};

const friendDecline = {
  url: "api/user/friend-request/:id/decline",
  auth: true,
  method: "POST",
  req: {},
  res: {
    message: String,
  },
};

const block = {
  url: "api/user/block/:id",
  auth: true,
  method: "POST",
  req: {},
  res: {
    message: String,
  },
};

const unblock = {
  url: "api/user/unblock/:id",
  auth: true,
  method: "POST",
  req: {},
  res: {
    message: String,
  },
};

const setAvatar = {
  url: "api/user/avatar",
  auth: true,
  method: "POST",
  contentType: "multipart/form-data",
  req: {
    avatar: File,
  },
  res: {
    avatarUrl: String,
  },
};

// ROOM

const getRoomList = {
  url: "api/room",
  auth: true,
  method: "GET",
  req: {},
  res: [
    {
      _id: String,
      roomName: String,
      roomAvatar: String,
      lastMsg: String,
    },
  ],
};

const getRoomInfo = {
  url: "api/room/:id",
  auth: true,
  method: "GET",
  req: {},
  res: {
    roomName: String,
    roomAvatar: String,
    isGroup: Boolean,
    messages: [
      {
        _id: String,
        senderId: String,
        msg: String,
        files: [
          {
            url: String,
            type: String,
          },
        ],
        unSend: Boolean,
        delete: Boolean,
        createdAt: Date,
        modifiedAt: Date,
      },
    ],
  },
};

const changeRoomName = {
  url: "api/room/:id/change-name",
  auth: true,
  method: "PUT",
  req: {
    roomName: String,
  },
  res: {
    message: String,
  },
};

const setNickname = {
  url: "api/room/:id/nickname",
  auth: true,
  method: "PUT",
  req: {
    uid: String,
    nickname: String,
  },
  res: {
    message: String,
  },
};

const addMember = {
  url: "api/room/:id/member",
  auth: true,
  method: "POST",
  req: {
    uid: String,
  },
  res: {
    message: String,
  },
};

// MESSAGE

const sendMessage = {
  url: "api/message",
  auth: true,
  method: "POST",
  contentType: "multipart",
  req: {
    roomId: String,
    msg: String,
    files: [
      {
        file: File,
        type: String, //file or image
      },
    ],
  },
  res: {
    msg: String,
    files: [
      {
        url: String,
        type: String, //file or image
      },
    ],
  },
};

const unSendMessage = {
  url: "api/message/:id/unsend",
  auth: true,
  method: "POST",
  req: {},
  res: {
    message: String,
  },
};

const deletedMessage = {
  url: "api/message/:id/delete",
  auth: true,
  method: "POST",
  req: {},
  res: {
    message: String,
  },
};
