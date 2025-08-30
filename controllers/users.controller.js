const usersModel = require("../models/users.model");

//유저목록가져오기
function getUsers(req, res) {
  res.json(usersModel);
}

//유저가져오기
function getUser(req, res) {
  const userID = Number(req.params.id);
  const user = usersModel[userID];
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
}

//유저생성
function createUser(req, res) {
  const newUser = {
    id: usersModel.length,
    name: req.body.name,
    email: req.body.email,
  };
  usersModel.push(newUser);
  res.status(201).json(newUser);
}

// function getUser2(req, res) {
//   const user = usersModel.find((user) => user.id === parseInt(req.params.id));
//   if (user) {
//     res.json(user);
//   } else {
//     res.status(404).json({ message: "User not found" });
//   }
// }

module.exports = {
  getUsers,
  getUser,
  // getUser2,
  createUser,
};
