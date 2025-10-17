# AIMBTI - AI MBTI 성격 유형 테스트

JavaScript만으로 어디서든 삽입 가능한 MBTI 성격 유형 테스트 서비스입니다.

## 특징

- 순수 JavaScript로 구현 (프레임워크 불필요)
- 모듈화된 구조로 확장 가능
- 외부 웹사이트에 쉽게 삽입 가능
- 반응형 디자인 (모바일 지원)
- 자동 진행 기능

## 프로젝트 구조

```
aimbti/
├── src/
│   ├── aimbti.js          # 메인 애플리케이션
│   ├── ui/
│   │   ├── styles.js      # UI 스타일
│   │   └── components.js  # UI 컴포넌트
│   └── services/
│       ├── questions.js   # 질문 데이터 및 서비스
│       └── results.js     # 결과 데이터 및 서비스
├── index.html             # 데모 페이지
└── README.md
```

## 사용 방법

### 1. 기본 사용 (로컬 개발)

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MBTI 테스트</title>
</head>
<body>
    <div id="aimbti-app"></div>

    <script type="module">
        import { AIMBTI } from './src/aimbti.js';

        const app = new AIMBTI('aimbti-app');
        app.init();
    </script>
</body>
</html>
```

### 2. 외부 웹사이트 삽입

다른 웹사이트에 삽입하려면 다음과 같이 사용하세요:

```html
<!-- AIMBTI 컨테이너 -->
<div id="my-mbti-test"></div>

<!-- AIMBTI 스크립트 -->
<script type="module">
    import { AIMBTI } from 'https://your-domain.com/src/aimbti.js';

    const app = new AIMBTI('my-mbti-test');
    app.init();
</script>
```

## 개발 서버 실행

로컬에서 테스트하려면 간단한 HTTP 서버가 필요합니다 (ES6 모듈 사용):

```bash
# Python 3
python -m http.server 8000

# Node.js (http-server 사용)
npx http-server

# VS Code Live Server 확장 사용
```

그런 다음 브라우저에서 `http://localhost:8000`으로 접속하세요.

## API

### AIMBTI 클래스

```javascript
import { AIMBTI } from './src/aimbti.js';

// 인스턴스 생성
const app = new AIMBTI(containerId);

// 초기화
app.init();

// 테스트 시작
app.startTest();

// 테스트 재시작
app.restartTest();
```

### QuestionService

```javascript
import { QuestionService } from './src/services/questions.js';

const questionService = new QuestionService();

// 모든 질문 가져오기
const questions = questionService.getQuestions();

// 특정 질문 가져오기
const question = questionService.getQuestion(0);

// 총 질문 수
const total = questionService.getTotalQuestions();
```

### ResultService

```javascript
import { ResultService } from './src/services/results.js';

const resultService = new ResultService();

// 결과 계산
const answers = { E: 2, I: 1, S: 2, N: 1, T: 1, F: 2, J: 2, P: 1 };
const { type, result } = resultService.calculateResult(answers);

// 특정 MBTI 유형 결과 가져오기
const result = resultService.getResult('ENFP');
```

## 확장 가능한 구조

### 새로운 질문 추가

`src/services/questions.js` 파일을 수정하여 질문을 추가할 수 있습니다:

```javascript
export const questions = [
    {
        question: "새로운 질문?",
        options: [
            { text: "옵션 1", type: "E" },
            { text: "옵션 2", type: "I" }
        ]
    },
    // ... 더 많은 질문
];
```

### 새로운 기능 추가

- `src/services/` 폴더에 새로운 서비스 추가
- `src/ui/components.js`에 새로운 UI 컴포넌트 추가
- `src/aimbti.js`에서 통합

## 향후 계획

- [ ] 결과 공유 기능
- [ ] 결과 저장 및 히스토리
- [ ] 다국어 지원
- [ ] 커스텀 테마
- [ ] 통계 및 분석 기능
- [ ] 소셜 로그인
- [ ] 결과 이미지 다운로드

## 라이선스

MIT License

## 기여

기여는 언제나 환영합니다! Issue나 Pull Request를 자유롭게 등록해주세요.
