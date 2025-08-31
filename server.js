const express = require("express");
const PORT = 3000;
const path = require("path");
const usersRouter = require("./routes/users.router");
const postsRouter = require("./routes/posts.router");

// 서버 생성
const app = express();

// JSON 데이터 파싱 bodyParser대용
app.use(express.json());

// 정적 파일 제공 (절대경로)
app.use("/static", express.static(path.join(__dirname, "public")));

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

app.use("/users", usersRouter);
app.use("/posts", postsRouter);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
