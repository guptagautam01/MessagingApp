export const getSender = (loggedUser, user) => {
  return user[0]._id === loggedUser._id ? user[1].name : user[0].name;
};
export const getSenderPic = (loggedUser, user) => {
  return user[0]._id === loggedUser._id ? user[1].pic : user[0].pic;
};
