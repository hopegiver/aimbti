# AIMBTI 인증 기능 가이드

## 개요

AIMBTI에 API 키 기반 인증 기능이 추가되었습니다. 각 웹사이트에서 발급받은 API 키를 사용하여 서비스를 이용할 수 있습니다.

## 인증 흐름

1. AIMBTI 초기화 시 API 키 전달
2. 현재 도메인과 API 키를 서버로 전송
3. 서버에서 API 키 유효성 및 도메인 검증
4. 인증 성공 시 테스트 실행 허용

## 사용 방법

### 기본 사용

```javascript
import { AIMBTI } from './src/aimbti.js';

const app = new AIMBTI('container-id', {
    apiKey: 'your-api-key-here'
});
app.init();
```

### HTML에서 사용

```html
<div id="mbti-test"></div>

<script type="module">
    import { AIMBTI } from './src/aimbti.js';

    const app = new AIMBTI('mbti-test', {
        apiKey: 'test-key-12345'
    });
    app.init();
</script>
```

## 테스트용 API 키

개발 및 테스트를 위한 Mock API 키들:

### 1. 로컬호스트용 키
- **API Key**: `test-key-12345`
- **도메인**: localhost
- **플랜**: Free
- **특징**: 로컬 개발 환경에서 사용

### 2. 프리미엄 키
- **API Key**: `demo-key-67890`
- **도메인**: example.com
- **플랜**: Premium
- **특징**: 커스텀 테마, 분석 기능 포함

### 3. 개발자 키 (와일드카드)
- **API Key**: `dev-key-abcde`
- **도메인**: * (모든 도메인 허용)
- **플랜**: Unlimited
- **특징**: 개발 목적으로 모든 도메인에서 사용 가능

## Mock API 구조

`mock-api/auth.json` 파일에 테스트용 인증 데이터가 저장되어 있습니다.

```json
{
  "validKeys": [
    {
      "apiKey": "test-key-12345",
      "domain": "localhost",
      "name": "Test Account",
      "plan": "free",
      "expiresAt": "2025-12-31T23:59:59Z",
      "features": {
        "maxTests": 1000,
        "customTheme": false,
        "analytics": false
      }
    }
  ],
  "errors": {
    "invalid_key": {
      "code": "AUTH_001",
      "message": "유효하지 않은 API 키입니다."
    }
  }
}
```

## 에러 처리

### 인증 실패 시

인증이 실패하면 사용자에게 에러 메시지가 표시됩니다:

```
⚠️ 인증 실패
유효하지 않은 API 키입니다.
```

### 에러 타입

1. **AUTH_001**: 유효하지 않은 API 키
2. **AUTH_002**: 허용되지 않은 도메인
3. **AUTH_003**: 만료된 API 키
4. **AUTH_004**: 사용 한도 초과

## 실제 API 연동

Mock API 대신 실제 API를 사용하려면 `src/services/auth.js`의 `AuthService` 클래스를 수정:

```javascript
const authService = new AuthService('your-api-key', {
    apiUrl: 'https://api.aimbti.com/v1/auth',
    useMock: false  // Mock API 비활성화
});
```

## 보안 고려사항

1. **API 키 노출 방지**: 클라이언트 사이드에서 API 키가 노출됩니다. 프론트엔드에서는 도메인 검증만 수행하고, 실제 사용량 체크는 서버에서 처리해야 합니다.

2. **도메인 검증**: 서버에서 요청 도메인과 등록된 도메인을 비교하여 무단 사용을 방지합니다.

3. **사용량 제한**: 서버에서 API 키별 사용량을 추적하고 제한합니다.

## 예제 파일

- `index.html` - 기본 인증 예제
- `example-auth.html` - 상세 인증 데모
- `mock-api/auth.json` - Mock 인증 데이터

## 테스트

로컬 서버 실행:

```bash
python -m http.server 8000
```

브라우저에서 접속:
- http://localhost:8000/index.html
- http://localhost:8000/example-auth.html

콘솔에서 인증 성공 메시지 확인:
```
✓ 인증 성공: Test Account (free 플랜)
```
