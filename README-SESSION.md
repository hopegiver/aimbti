# AIMBTI 사용자 세션 & 결과 저장 가이드

## 개요

AIMBTI에 사용자별 세션 관리와 결과 저장 기능이 추가되었습니다. 각 회원의 테스트 결과를 서버에 저장하고 히스토리를 관리할 수 있습니다.

## 아키텍처

```
┌─────────────────┐
│   웹사이트       │ ← 회원 관리
│  (Your Site)    │
└────────┬────────┘
         │ API Key + User Token
         ↓
┌─────────────────┐
│   AIMBTI JS     │ ← 프론트엔드 위젯
│  - 인증         │
│  - 세션 시작     │
│  - 테스트 진행   │
│  - 결과 저장     │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│ AIMBTI API      │ ← 백엔드 서버
│  - 세션 생성     │
│  - 결과 저장     │
│  - 히스토리 조회 │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  데이터베이스    │
└─────────────────┘
```

## 사용 방법

### 기본 사용 (사용자 토큰 포함)

```javascript
import { AIMBTI } from './src/aimbti.js';

const app = new AIMBTI('container-id', {
    apiKey: 'your-api-key',           // 사이트 인증용
    userToken: 'user-unique-token',    // 회원 식별용 (필수)
    userId: 'user@example.com',        // 회원 ID (선택)
    saveResults: true,                 // 결과 저장 (기본값: true)
    onComplete: (result) => {
        // 테스트 완료 시 실행
        console.log('완료:', result);
    },
    onSave: (saveData) => {
        // 결과 저장 완료 시 실행
        console.log('저장:', saveData);
    }
});

app.init();
```

### 실제 사이트 통합 예제

```javascript
// 1. 사용자 로그인 후 토큰 받기 (백엔드에서)
const userToken = await fetch('/api/user/token').then(r => r.json());

// 2. AIMBTI 초기화
const app = new AIMBTI('mbti-test', {
    apiKey: 'site-api-key',
    userToken: userToken,
    userId: currentUser.email,
    onComplete: async (result) => {
        // 사이트 백엔드로 결과 전송
        await fetch('/api/mbti/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: currentUser.id,
                mbtiType: result.type,
                result: result.result
            })
        });
    }
});

app.init();
```

## 데이터 구조

### 세션 데이터

```json
{
  "sessionId": "session_1234567890_abc123",
  "userToken": "user_token_test_001",
  "userId": "user@example.com",
  "apiKey": "test-key-12345",
  "startedAt": "2024-10-17T10:00:00Z",
  "expiresAt": "2024-10-17T11:00:00Z"
}
```

### 저장된 결과 데이터

```json
{
  "resultId": "result_1234567890_abc123",
  "sessionId": "session_1234567890_abc123",
  "userToken": "user_token_test_001",
  "userId": "user@example.com",
  "apiKey": "test-key-12345",
  "mbtiType": "ENFP",
  "result": {
    "title": "스파크형",
    "description": "열정적이고 창의적인 사람들입니다."
  },
  "answers": {
    "E": 2, "I": 1, "S": 1, "N": 2,
    "T": 1, "F": 2, "J": 1, "P": 2
  },
  "completedAt": "2024-10-17T10:15:00Z",
  "savedAt": "2024-10-17T10:15:01Z",
  "ipAddress": "127.0.0.1",
  "userAgent": "Mozilla/5.0...",
  "shareUrl": "https://aimbti.com/result/result_1234567890_abc123"
}
```

## API 엔드포인트

### 1. 세션 시작

```
POST /api/v1/test/start

Request:
{
  "apiKey": "string",
  "userToken": "string",
  "userId": "string" (optional)
}

Response:
{
  "success": true,
  "data": {
    "sessionId": "string",
    "expiresAt": "ISO8601 datetime"
  }
}
```

### 2. 결과 저장

```
POST /api/v1/test/submit

Request:
{
  "sessionId": "string",
  "userToken": "string",
  "apiKey": "string",
  "mbtiType": "string",
  "result": { ... },
  "answers": { ... }
}

Response:
{
  "success": true,
  "data": {
    "resultId": "string",
    "savedAt": "ISO8601 datetime",
    "shareUrl": "string"
  }
}
```

### 3. 히스토리 조회

```
GET /api/v1/test/history?userToken={token}&limit={number}

Response:
{
  "success": true,
  "data": {
    "results": [ ... ],
    "total": number
  }
}
```

## Mock API 테스트

개발 환경에서는 Mock API를 사용합니다:

- `mock-api/session.json` - 세션 데이터
- `mock-api/results.json` - 저장된 결과 데이터

실제로는 localStorage에 저장되어 브라우저 콘솔에서 확인 가능합니다:

```javascript
// 저장된 결과 확인
JSON.parse(localStorage.getItem('aimbti_results'));
```

## 콜백 함수

### onComplete

테스트 완료 시 실행됩니다.

```javascript
onComplete: (result) => {
  console.log('MBTI Type:', result.type);
  console.log('Title:', result.result.title);
  console.log('Answers:', result.answers);
}
```

### onSave

결과 저장 완료 시 실행됩니다.

```javascript
onSave: (saveData) => {
  console.log('Result ID:', saveData.resultId);
  console.log('Share URL:', saveData.shareUrl);
  console.log('Saved At:', saveData.savedAt);
}
```

## 데이터베이스 스키마 제안

```sql
CREATE TABLE test_results (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    result_id VARCHAR(255) UNIQUE NOT NULL,
    session_id VARCHAR(255) NOT NULL,
    site_api_key VARCHAR(255) NOT NULL,
    user_token VARCHAR(255) NOT NULL,
    user_id VARCHAR(255),
    mbti_type VARCHAR(4) NOT NULL,
    answers JSON NOT NULL,
    result_data JSON NOT NULL,
    completed_at TIMESTAMP NOT NULL,
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    user_agent TEXT,
    share_url VARCHAR(500),

    INDEX idx_user_token (user_token),
    INDEX idx_site_api_key (site_api_key),
    INDEX idx_session_id (session_id),
    INDEX idx_completed_at (completed_at)
);

CREATE TABLE test_sessions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    session_id VARCHAR(255) UNIQUE NOT NULL,
    api_key VARCHAR(255) NOT NULL,
    user_token VARCHAR(255) NOT NULL,
    user_id VARCHAR(255),
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    status ENUM('active', 'completed', 'expired') DEFAULT 'active',

    INDEX idx_session_id (session_id),
    INDEX idx_user_token (user_token),
    INDEX idx_expires_at (expires_at)
);
```

## User Token 생성 방법

백엔드에서 안전하게 생성해야 합니다:

```javascript
// Node.js 예제
const jwt = require('jsonwebtoken');

function generateUserToken(userId, siteId, secret) {
    const payload = {
        userId: userId,
        siteId: siteId,
        timestamp: Date.now()
    };

    return jwt.sign(payload, secret, { expiresIn: '7d' });
}

// 사용
const userToken = generateUserToken(
    'user123',
    'your-site-id',
    process.env.JWT_SECRET
);
```

## 예제 파일

- [example-session.html](example-session.html) - 사용자 세션 데모
- [mock-api/session.json](mock-api/session.json) - Mock 세션 데이터
- [mock-api/results.json](mock-api/results.json) - Mock 결과 데이터

## 테스트

로컬 서버 실행:

```bash
python -m http.server 8000
```

브라우저에서 접속:
- http://localhost:8000/example-session.html

콘솔에서 확인할 로그:
```
✓ 테스트 세션 시작: session_xxx
✓ 인증 성공: Test Account (free 플랜)
✓ AIMBTI 초기화 완료
✓ 결과 저장 완료: result_xxx
✓ 테스트 완료: ENFP - 스파크형
```

## 보안 고려사항

1. **User Token 보안**
   - HTTPS 필수
   - Token은 백엔드에서 생성
   - 짧은 만료 시간 설정

2. **서버 검증**
   - API Key와 Domain 검증
   - User Token 유효성 확인
   - Rate limiting 적용

3. **데이터 보호**
   - 민감 정보 암호화
   - GDPR 준수
   - 사용자 동의 확보

## 향후 기능

- [ ] 결과 공유 URL 생성
- [ ] 친구와 결과 비교
- [ ] 시간별 MBTI 변화 추적
- [ ] 사이트별 통계 대시보드
- [ ] 웹훅 알림
- [ ] CSV/PDF 내보내기
