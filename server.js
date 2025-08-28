const express = require("express");

const PORT = 3000;

// 서버 생성
const app = express();

// 미들웨어 설정
app.use((req, res, next) => {
  const start = Date.now();
  next();
  const diffTime = Date.now() - start;
  //단순 디버깅용
  console.log(`${req.method} ${req.url} ${diffTime}ms`);
  //운영환경에서 로깅용
  res.on("finish", () => {
    console.log(`${req.method} ${req.url} ${diffTime}ms`);
  });
});

// 라우터 설정
app.get("/", (req, res) => {
  res.send("This is Express Server");
});

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});

const users = [
  { id: 0, name: "John", email: "john@example.com" },
  { id: 1, name: "제인", email: "jane@example.com" },
  { id: 2, name: "Jim", email: "jim@example.com" },
];

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const userID = Number(req.params.id);
  const user = users[userID];
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

//find 메서드 사용
//만약 ID가 순차적이지 않다면 (예: { id: 100, name: "John" }) find()를 사용해야 합니다.

// app.get("/users/:id", (req, res) => {
//   const user = users.find((user) => user.id === parseInt(req.params.id));
//   if (user) {
//     res.json(user);
//   } else {
//     res.status(404).json({ message: "User not found" });
//   }
// });
