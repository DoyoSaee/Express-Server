const express = require("express");
const PORT = 3000;
const path = require("path");
const { engine } = require("express-handlebars");
const usersRouter = require("./routes/users.router");
const postsRouter = require("./routes/posts.router");
const { hasSubscribers } = require("diagnostics_channel");

// 서버 생성
const app = express();

// JSON 데이터 파싱 bodyParser대용
app.use(express.json());

// 템플릿 엔진 설정 - express-handlebars 사용
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "layout",
    layoutsDir: path.join(__dirname, "views"),
    helpers: {
      eq: function (a, b) {
        return a === b;
      },
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

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

// 루트 경로에서 HBS 템플릿 렌더링
app.get("/", (req, res) => {
  const selectedImage = req.query.image || 1; // 쿼리 파라미터로 선택된 이미지 번호

  // 이미지 데이터 배열
  const images = [
    { id: 1, name: "Image 1", description: "첫 번째 이미지" },
    { id: 2, name: "Image 2", description: "두 번째 이미지" },
    { id: 3, name: "Image 3", description: "세 번째 이미지" },
    { id: 4, name: "Image 4", description: "네 번째 이미지" },
    { id: 5, name: "Image 5", description: "다섯 번째 이미지" },
    { id: 6, name: "Image 6", description: "여섯 번째 이미지" },
    { id: 7, name: "Image 7", description: "일곱 번째 이미지" },
    { id: 8, name: "Image 8", description: "여덟 번째 이미지" },
    { id: 9, name: "Image 9", description: "아홉 번째 이미지" },
    { id: 10, name: "Image 10", description: "열 번째 이미지" },
  ];

  const currentImage =
    images.find((img) => img.id === parseInt(selectedImage)) || images[0];

  res.render("index", {
    title: `${currentImage.name} | 갤러리`,
    selectedImage: parseInt(selectedImage),
    images: images,
    currentImage,
  });
});

app.use("/users", usersRouter);
app.use("/posts", postsRouter);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
