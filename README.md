# SCENERY (Deskterior-Scenery)

책상 위 공간을 꾸미는 **데스크테리어(Desk + Interior) 소품 전문 쇼핑몰**입니다.

> ⚠️ 이 README는 코드베이스를 기반으로 작성된 초안입니다. `[ ]`로 표시된 항목은 팀원분들이 직접 채워 넣어야 합니다.

<br>

## 목차

- [프로젝트 소개](#프로젝트-소개)
- [팀원 및 역할](#팀원-및-역할)
- [개발 기간](#개발-기간)
- [서비스 콘셉트](#서비스-콘셉트)
- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [프로젝트 파일 구조](#프로젝트-파일-구조)
- [실행 방법](#실행-방법)
- [환경 변수 안내](#환경-변수-안내)
- [주요 화면](#주요-화면)
- [API 사용 방법](#api-사용-방법)
- [트러블슈팅](#트러블슈팅)
- [프로젝트 회고](#프로젝트-회고)

<br>

## 프로젝트 소개

**SCENERY**는 조명, 수납, 디지털/전자기기, 데스크 액세서리, 문구 등 책상 주변을 꾸미는 소품을 카테고리별로 둘러보고 구매할 수 있는 이커머스 웹 서비스입니다. 상품 탐색부터 장바구니, 위시리스트(찜), 리뷰 작성, 결제 확인까지 일반적인 쇼핑몰의 핵심 구매 흐름을 구현했습니다.

- 배포 URL: `[ ]`
- 테스트 계정: `[ ]`

<br>

## 팀원 및 역할

| 이름 | GitHub | 역할 |
| --- | --- | --- |
| 최우원 | [@singthesong2](https://github.com/singthesong2) | 팀장, 로그인/회원가입, 마이페이지 |
| 김양왕 | [@gimyangwang-bit](https://github.com/gimyangwang-bit) | 카테고리/상품 목록 페이지 |
| 나민우 | [@Naminwoo](https://github.com/Naminwoo) | 장바구니 페이지, 마이페이지 찜 기능 |
| 김채가 | [@chaegagim-code](https://github.com/chaegagim-code) | 상세 페이지, 회의록 작성, PPT 초안 |
| 최현옥 | [@hyunock](https://github.com/hyunock) | 디자인, 홈 페이지 |

> 각자 담당한 화면/기능(예: 로그인·회원가입, 상품 목록/상세, 장바구니, 리뷰, 공통 컴포넌트 등)을 적어주세요.

<br>

## 개발 기간

`2026.08.25 ~ 2026.09.15` (약 3주)

> 최초 커밋(`first commit`) 기준 시작일이며, 실제 기획/디자인 기간이 있었다면 함께 적어주세요.

<br>

## 서비스 콘셉트

책상 위 풍경(Scenery)을 취향대로 구성한다는 콘셉트로, 카테고리를 다음과 같이 나누어 제공합니다.

- **Lighting** (조명)
- **Organization** (수납/정리)
- **Digital / Electronics** (디지털/전자기기)
- **Desk Accessories** (데스크 액세서리)
- **Stationery** (문구)

`[ ]` 서비스가 해결하고자 한 문제, 타겟 사용자, 차별화 포인트 등을 추가해주세요.

<br>

## 주요 기능

### 인증
- 회원가입 / 아이디 중복 확인 / 로그인 / 로그아웃
- 새로고침 시 토큰(localStorage) 기반 로그인 상태 자동 복구

### 상품
- 카테고리별 상품 목록 조회 (페이지네이션, 정렬/필터 툴바)
- 상품 상세 페이지 (이미지 갤러리, 상세 설명, BEST/NEW/품절 뱃지)
- 상품 리뷰 목록 조회, 평점 요약(평균 별점)

### 리뷰
- 로그인 사용자의 리뷰 작성 / 수정 / 삭제 (본인 리뷰만)

### 장바구니
- 상품 담기, 수량 변경, 개별/선택 삭제, 전체 비우기
- 비회원도 장바구니 이용 가능, 로그인 시 서버와 자동 동기화
- 헤더 아이콘에 담긴 상품 개수 뱃지 표시

### 위시리스트(찜)
- 상품 찜하기/취소 (비회원도 가능, 로컬 저장)
- 로그아웃 시 찜 목록 초기화

### 결제
- 구매 확인 모달을 통한 결제 진행 플로우

### 마이페이지
- `[ ]` 마이페이지에서 제공하는 기능(주문 내역, 회원 정보 수정 등)을 적어주세요.

### 공통 UX
- 반응형 헤더 및 모바일 햄버거 메뉴
- 전역 토스트 알림(성공/실패), 페이지 전환 로딩 인디케이터
- 스크롤 위치 복원, 맨 위로 가기 버튼

<br>

## 기술 스택

**Frontend**
- React 19 (React Compiler 적용)
- Vite 8
- React Router 8

**상태 관리 / 데이터 패칭**
- Zustand (+ `persist` 미들웨어)
- TanStack Query (React Query)

**스타일링**
- Emotion (`@emotion/react`, `@emotion/styled`)

**폼 / 검증**
- Zod

**UI / 기타**
- Tabler Icons React
- Motion (애니메이션)
- React Spinners (로딩 인디케이터)
- React Toastify (토스트 알림)

**Lint / 개발 도구**
- ESLint (`eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`)
- Babel + `babel-plugin-react-compiler`

`[ ]` 백엔드/DB/배포 관련 스택(사용 중인 서버, 데이터베이스, 배포 플랫폼 등)을 추가해주세요.

<br>

## 프로젝트 파일 구조

```
Deskterior-Scenery/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── api/                     # 서버 통신 (fetch 래퍼 + 도메인별 API)
│   │   ├── authApi.js
│   │   ├── cartApi.js
│   │   ├── categoriesApi.js
│   │   ├── clientApi.js         # 공통 fetch 래퍼 (인증 헤더, 에러 처리)
│   │   ├── mainApi.js
│   │   ├── productsApi.js
│   │   └── reviewsApi.js
│   ├── assets/                  # 이미지 / 영상 리소스
│   ├── components/
│   │   ├── cart/                # 장바구니 아이템, 요약, 추천 상품
│   │   ├── common/               # Modal, Toast, Loading, SafeImage 등 공통 컴포넌트
│   │   ├── home/                 # 홈 화면 섹션 (Hero, 카테고리, 큐레이션 등)
│   │   ├── icons/                 # SVG 아이콘 모음
│   │   ├── layout/               # Header, Footer
│   │   ├── product/               # 상품 카드, 상세, 갤러리, 구매 박스 등
│   │   ├── review/                 # 리뷰 작성/목록/요약
│   │   └── AuthForm.jsx
│   ├── constants/                 # 목업 상수 데이터
│   ├── data/                      # 카테고리, 상품명 매핑 등 정적 데이터
│   ├── hooks/
│   ├── pages/
│   │   ├── Cart/CartPage.jsx
│   │   ├── Category/CategoryPage.jsx
│   │   ├── Home/HomePage.jsx
│   │   ├── Product/ProductDetailPage.jsx
│   │   ├── LoginForm.jsx
│   │   ├── SignupForm.jsx
│   │   ├── MyPage.jsx
│   │   ├── NotFoundPage.jsx
│   │   └── commonLayout.jsx        # 공통 레이아웃 (Header/Footer + Outlet)
│   ├── schema/                     # Zod 스키마 (회원가입/로그인 검증)
│   ├── store/                      # Zustand 스토어 (인증, 로딩, 장바구니, 카테고리, 위시리스트)
│   ├── styles/                     # Emotion 스타일 (기능별 하위 폴더로 분리)
│   ├── utils/
│   ├── App.jsx                     # 라우트 정의
│   └── main.jsx                    # 엔트리 포인트
├── .env.example
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.js
```

<br>

## 실행 방법

```bash
# 1. 저장소 클론
git clone https://github.com/singthesong2/Deskterior-Scenery.git
cd Deskterior-Scenery

# 2. 의존성 설치
npm install

# 3. 환경 변수 설정 (.env 파일 생성, 아래 "환경 변수 안내" 참고)
cp .env.example .env

# 4. 개발 서버 실행
npm run dev
```

그 외 스크립트

```bash
npm run build     # 프로덕션 빌드 (dist/ 생성)
npm run preview   # 빌드 결과 미리보기
npm run lint      # ESLint 검사
```

<br>

## 환경 변수 안내

`.env.example`을 참고하여 프로젝트 루트에 `.env` 파일을 생성합니다.

| 변수명 | 설명 | 예시 |
| --- | --- | --- |
| `VITE_API_BASE_URL` | 백엔드 API 서버의 base URL | `https://api.example.com/api/14/team1` |

> 민감한 실제 값을 README에 작성하지 않도록 주의합니다. 실제 값은 `.env` 파일에만 두고 커밋하지 않습니다.

<br>

## 주요 화면

| 화면 | 이미지 |
| --- | --- |
| 홈 | ![홈](docs/screenshots/01-home.png) |
| 카테고리(상품 목록) | ![카테고리](docs/screenshots/02-category.png) |
| 상품 상세 | ![상품 상세](docs/screenshots/03-product-detail.png) |
| 장바구니 | ![장바구니](docs/screenshots/04-cart.png) |
| 로그인 | ![로그인](docs/screenshots/05-login.png) |
| 회원가입 | ![회원가입](docs/screenshots/06-signup.png) |
| 모바일 반응형(홈) | ![모바일 홈](docs/screenshots/07-home-mobile.png) |

> 결제 확인 모달 화면은 실제 로그인 후 구매 흐름에서 캡처해야 해서 아직 비어 있습니다. `[ ]` 로그인 → 장바구니 담기 → 체크아웃 화면을 캡처해서 추가해주세요.

<br>

## API 사용 방법

모든 요청은 `src/api/clientApi.js`의 공통 fetch 래퍼를 통해 나가며, 로그인 토큰이 있으면 `Authorization: Bearer {token}` 헤더가 자동으로 붙습니다.

Swagger 문서: 팀 노션/Swagger는 별도 공유

### 인증 (`/auth`)

| Method | Endpoint | 설명 |
| --- | --- | --- |
| POST | `/auth/signup` | 회원가입 |
| POST | `/auth/check-id` | 아이디 중복 확인 |
| POST | `/auth/login` | 로그인 |
| POST | `/auth/logout` | 로그아웃 |
| GET | `/auth/me` | 로그인한 사용자 정보 조회 |

### 상품 (`/products`)

| Method | Endpoint | 설명 |
| --- | --- | --- |
| GET | `/products?category=&page=&limit=` | 상품 목록 조회 |
| GET | `/products/{productId}` | 상품 상세 조회 |
| POST | `/products` | 상품 등록 `[ ]` |

### 리뷰 (`/products/{productId}/reviews`, `/reviews`)

| Method | Endpoint | 설명 |
| --- | --- | --- |
| GET | `/products/{productId}/reviews` | 리뷰 목록 + 평균 평점 조회 |
| POST | `/products/{productId}/reviews` | 리뷰 작성 (로그인 필요) |
| PATCH | `/reviews/{reviewId}` | 리뷰 수정 (작성자만) |
| DELETE | `/reviews/{reviewId}` | 리뷰 삭제 (작성자만) |

### 장바구니 (`/cart`)

| Method | Endpoint | 설명 |
| --- | --- | --- |
| GET | `/cart` | 장바구니 전체 조회 |
| POST | `/cart/items` | 상품 담기 |
| PATCH | `/cart/items/{cartItemId}` | 수량 변경 |
| DELETE | `/cart/items/{cartItemId}` | 개별 상품 삭제 |
| DELETE | `/cart/items` | 선택 상품 삭제 |
| DELETE | `/cart` | 장바구니 전체 삭제 |
| GET | `/cart/count` | 장바구니 상품 개수 조회 |

<br>

## 트러블슈팅

> 코드에 기록된 이슈 위주의 초안입니다. 팀원분들이 겪은 다른 이슈(배포, CORS, 협업 컨벤션 등)도 함께 추가해주세요.

- **모달이 화면 중앙이 아니라 헤더 안에 갇혀 보이는 문제**
  헤더에 적용된 `backdrop-filter`가 `position: fixed`인 자식 요소의 containing block을 뷰포트가 아닌 헤더 박스로 바꿔버려, 로그아웃 확인 모달이 화면 중앙이 아닌 헤더 영역 안에서만 렌더링되었습니다. 모바일 메뉴와 동일하게 `createPortal`로 모달을 `document.body`에 직접 포탈링하여 해결했습니다.

- **로그인 상태에 따라 같은 URL의 API 응답이 다른데, 브라우저가 이전 응답을 재사용하는 문제**
  로그인/비로그인 상태에서 동일한 엔드포인트가 다른 데이터를 반환할 수 있는데, 브라우저가 `304 Not Modified`로 예전 응답을 그대로 재사용하는 경우가 있었습니다. 공통 fetch 래퍼(`clientApi`)에 `cache: "no-store"`를 지정해 항상 최신 응답을 받도록 했습니다.

- **모바일 메뉴가 열려 있는 동안 ESC 키를 누르면 위에 뜬 로그아웃 모달이 아니라 메뉴가 먼저 닫히는 문제**
  ESC 핸들러가 등록된 `useEffect`의 의존성 배열에 모달 열림 상태를 직접 넣으면, 모달을 열고 닫을 때마다 스크롤 잠금·포커스 이동 로직 전체가 재실행되어 포커스가 엉뚱한 곳으로 튀는 부작용이 있었습니다. 최신 상태를 `ref`로 따로 추적해 effect 재실행 없이 ESC 시점에 "지금 실제로 보이는 레이어(모달 vs 메뉴)"만 닫도록 했습니다.

- **위시리스트(찜) 목록을 `Set`으로 관리하는데 `localStorage`에 저장하면 빈 객체(`{}`)로 저장되는 문제**
  `Set`은 `JSON.stringify` 시 배열이 아닌 `{}`로 직렬화되어 새로고침하면 찜 목록이 날아가는 문제가 있었습니다. Zustand `persist` 미들웨어에 커스텀 `replacer`/`reviver`를 적용해 저장 시 배열로, 복원 시 다시 `Set`으로 변환하도록 했습니다.

<br>

## 프로젝트 회고

`[ ]` 팀원별로 프로젝트를 진행하며 느낀 점, 아쉬운 점, 다음 프로젝트에 적용하고 싶은 점 등을 자유롭게 작성해주세요.

- **김양왕**: `[ ]`
- `[ ]`: `[ ]`
- `[ ]`: `[ ]`
