// Authentication Service
export class AuthService {
    constructor(apiKey, options = {}) {
        this.apiKey = apiKey;
        this.apiUrl = options.apiUrl || '/mock-api/auth.json'; // 실제 운영시에는 실제 API URL로 변경
        this.useMock = options.useMock !== false; // 기본값은 mock 사용
        this.authData = null;
        this.isAuthenticated = false;
    }

    /**
     * 현재 도메인 가져오기
     */
    getCurrentDomain() {
        if (typeof window === 'undefined') {
            return 'localhost';
        }

        let hostname = window.location.hostname;

        // 127.0.0.1을 localhost로 변환
        if (hostname === '127.0.0.1') {
            hostname = 'localhost';
        }

        return hostname;
    }

    /**
     * API 키 유효성 검증
     */
    async authenticate() {
        if (!this.apiKey) {
            throw new Error('API 키가 제공되지 않았습니다.');
        }

        try {
            const currentDomain = this.getCurrentDomain();

            if (this.useMock) {
                // Mock API 사용
                return await this.authenticateWithMock(currentDomain);
            } else {
                // 실제 API 사용
                return await this.authenticateWithAPI(currentDomain);
            }
        } catch (error) {
            console.error('Authentication error:', error);
            throw error;
        }
    }

    /**
     * Mock API로 인증 (개발/테스트용)
     */
    async authenticateWithMock(currentDomain) {
        try {
            const response = await fetch(this.apiUrl);
            if (!response.ok) {
                throw new Error('Mock API를 불러올 수 없습니다.');
            }

            const data = await response.json();

            // API 키로 찾기
            const keyData = data.validKeys.find(k => k.apiKey === this.apiKey);

            if (!keyData) {
                throw new Error(data.errors.invalid_key.message);
            }

            // 도메인 검증 (* 는 모든 도메인 허용)
            if (keyData.domain !== '*' && keyData.domain !== currentDomain) {
                throw new Error(data.errors.domain_mismatch.message);
            }

            // 만료일 검증
            const expiresAt = new Date(keyData.expiresAt);
            if (expiresAt < new Date()) {
                throw new Error(data.errors.expired_key.message);
            }

            this.authData = keyData;
            this.isAuthenticated = true;

            console.log(`✓ 인증 성공: ${keyData.name} (${keyData.plan} 플랜)`);

            return {
                success: true,
                data: keyData
            };
        } catch (error) {
            this.isAuthenticated = false;
            throw error;
        }
    }

    /**
     * 실제 API로 인증 (운영용)
     */
    async authenticateWithAPI(currentDomain) {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    apiKey: this.apiKey,
                    domain: currentDomain,
                    timestamp: new Date().toISOString()
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || '인증에 실패했습니다.');
            }

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.message || '인증에 실패했습니다.');
            }

            this.authData = data.data;
            this.isAuthenticated = true;

            return data;
        } catch (error) {
            this.isAuthenticated = false;
            throw error;
        }
    }

    /**
     * 인증 상태 확인
     */
    isValid() {
        return this.isAuthenticated && this.authData !== null;
    }

    /**
     * 인증 데이터 가져오기
     */
    getAuthData() {
        return this.authData;
    }

    /**
     * 기능 사용 가능 여부 확인
     */
    hasFeature(featureName) {
        if (!this.isValid()) {
            return false;
        }
        return this.authData.features && this.authData.features[featureName] === true;
    }

    /**
     * 사용 한도 확인
     */
    canUseService() {
        if (!this.isValid()) {
            return false;
        }

        // maxTests가 -1이면 무제한
        if (this.authData.features.maxTests === -1) {
            return true;
        }

        // 실제 운영시에는 서버에서 사용 횟수를 체크해야 함
        return true;
    }
}
