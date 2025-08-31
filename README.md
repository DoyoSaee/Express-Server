# Express Server – 기본 공부 정리

간단한 Express 서버를 만들어 라우팅, 컨트롤러/모델 분리, 템플릿 엔진(Handlebars), 정적 파일 제공, 미들웨어 사용을 연습한 프로젝트입니다.

---

## 실행 방법

1. 의존성 설치

```bash
pnpm i     # 또는 npm i
```

2. 개발 모드 실행 (자동 재시작)

```bash
pnpm run dev
```

3. 프로덕션 실행

```bash
pnpm start
```

브라우저에서 http://localhost:3000 접속

---

## 기술 스택

- Node.js, Express 5
- express-handlebars (템플릿 엔진, 확장자 .hbs)
- 정적 파일 제공 (Express static)

---

## 프로젝트 구조

```bash
ExpressServer/
├── controllers/          # 라우트 로직 분리 (비즈니스 로직)
├── models/               # 임시 데이터 (메모리 배열)
├── routes/               # Express Router 정의
├── public/               # 정적 파일(css, 이미지, 정적 html)
├── views/                # Handlebars 템플릿 (layout.hbs, index.hbs 등)
├── server.js             # 앱 진입점 (포트 3000)
├── package.json
└── pnpm-lock.yaml
```

---

## 주요 라우트 정리

### 1) 홈 페이지 (갤러리)

- GET `/` → `views/index.hbs` 렌더링
- 쿼리 파라미터 `image`로 메인 이미지 변경 (기본 1)
  - 예: `/`, `/?image=5`

### 2) Users API

- GET `/users` → 전체 유저 목록(JSON)
- GET `/users/:id` → 단일 유저(JSON)
  - 현재는 배열 인덱스를 id로 사용 (예: 0, 1, 2)
  - 존재하지 않으면 404
- POST `/users` → 유저 생성(JSON)
  - 요청 예시

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com"}'
```

### 3) Posts 페이지

- GET `/posts` → `views/posts.hbs` 렌더링 (간단한 템플릿 예제)

### 4) 정적 파일

- 정적 경로: `/static` → `public` 디렉터리 매핑
  - 예: CSS `/static/css/style.css`
  - 예: 이미지 `/static/images/1.jpg`
  - 예: 정적 HTML `/static/index.html`

---

## 미들웨어 및 설정

- `express.json()`으로 JSON 본문 파싱
- 커스텀 로거 미들웨어로 요청 처리시간 로깅
- Handlebars 설정
  - 기본 레이아웃: `views/layout.hbs`
  - 헬퍼: `eq` (템플릿에서 값 비교에 사용)

---

## 학습 포인트

- 라우팅 분리: Router → Controller → Model 흐름 설계
- 템플릿 엔진: 레이아웃/부분 템플릿, 헬퍼 사용
- 정적 파일 서빙: `/static` 프리픽스와 실제 디렉터리 매핑
- 미들웨어: 요청별 처리시간 측정과 로깅 패턴
- 간단한 REST 패턴: 목록/상세 조회, 생성(POST)

---

## 파일 참고

- `server.js` — 서버 설정, 뷰 엔진/정적 경로/미들웨어/루트 라우트
- `routes/users.router.js` — Users 라우팅
- `controllers/users.controller.js` — Users 컨트롤러 로직
- `models/users.model.js` — 임시 유저 데이터(메모리)
- `views/index.hbs` — 갤러리 템플릿 (쿼리로 이미지 선택)
- `public/` — CSS, 이미지, 정적 HTML(`index.html`)

---

## 다음에 해볼 것(아이디어)

- 유효성 검증(예: POST /users 입력 체크)
- 에러 처리 미들웨어 공통화
- 서비스 계층 분리 및 테스트 추가
- 실제 DB 연동(MongoDB 또는 PostgreSQL)
- 추후 모노레포로 리팩토링
