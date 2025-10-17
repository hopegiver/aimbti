// User Session Service
export class SessionService {
    constructor(apiKey, userToken, options = {}) {
        this.apiKey = apiKey;
        this.userToken = userToken;
        this.userId = options.userId || null;
        this.apiUrl = options.apiUrl || '/mock-api';
        this.useMock = options.useMock !== false;
        this.sessionId = null;
        this.sessionData = null;
    }

    /**
     * 테스트 세션 시작
     */
    async startSession() {
        if (!this.apiKey || !this.userToken) {
            throw new Error('API 키와 사용자 토큰이 필요합니다.');
        }

        try {
            if (this.useMock) {
                return await this.startSessionWithMock();
            } else {
                return await this.startSessionWithAPI();
            }
        } catch (error) {
            console.error('Session start error:', error);
            throw error;
        }
    }

    /**
     * Mock API로 세션 시작
     */
    async startSessionWithMock() {
        // Mock 데이터 생성
        this.sessionId = this.generateSessionId();
        this.sessionData = {
            sessionId: this.sessionId,
            userId: this.userId,
            userToken: this.userToken,
            apiKey: this.apiKey,
            startedAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 3600000).toISOString() // 1시간 후
        };

        console.log('✓ 테스트 세션 시작:', this.sessionId);

        return {
            success: true,
            data: this.sessionData
        };
    }

    /**
     * 실제 API로 세션 시작
     */
    async startSessionWithAPI() {
        const response = await fetch(`${this.apiUrl}/test/start`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                apiKey: this.apiKey,
                userToken: this.userToken,
                userId: this.userId,
                timestamp: new Date().toISOString()
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || '세션 시작에 실패했습니다.');
        }

        const data = await response.json();
        this.sessionId = data.sessionId;
        this.sessionData = data;

        return data;
    }

    /**
     * 세션 ID 생성
     */
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * 세션 데이터 가져오기
     */
    getSessionData() {
        return this.sessionData;
    }

    /**
     * 세션 ID 가져오기
     */
    getSessionId() {
        return this.sessionId;
    }

    /**
     * 세션 유효성 확인
     */
    isValid() {
        if (!this.sessionData) {
            return false;
        }

        const expiresAt = new Date(this.sessionData.expiresAt);
        return expiresAt > new Date();
    }
}
