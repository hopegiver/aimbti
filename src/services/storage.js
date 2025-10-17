// Result Storage Service
export class StorageService {
    constructor(apiKey, options = {}) {
        this.apiKey = apiKey;
        this.apiUrl = options.apiUrl || '/mock-api';
        this.useMock = options.useMock !== false;
    }

    /**
     * 테스트 결과 저장
     */
    async saveResult(sessionId, userToken, result, answers) {
        if (!sessionId || !userToken) {
            throw new Error('세션 ID와 사용자 토큰이 필요합니다.');
        }

        const resultData = {
            sessionId,
            userToken,
            apiKey: this.apiKey,
            mbtiType: result.type,
            result: result.result,
            answers,
            completedAt: new Date().toISOString(),
            ipAddress: this.getClientIP(),
            userAgent: navigator.userAgent
        };

        try {
            if (this.useMock) {
                return await this.saveResultWithMock(resultData);
            } else {
                return await this.saveResultWithAPI(resultData);
            }
        } catch (error) {
            console.error('Result save error:', error);
            throw error;
        }
    }

    /**
     * Mock으로 결과 저장
     */
    async saveResultWithMock(resultData) {
        // Mock 저장 (실제로는 저장되지 않음)
        const resultId = this.generateResultId();

        // 로컬스토리지에 저장 (테스트용)
        const savedResults = this.getSavedResults();
        savedResults.push({
            resultId,
            ...resultData,
            savedAt: new Date().toISOString()
        });
        localStorage.setItem('aimbti_results', JSON.stringify(savedResults));

        console.log('✓ 테스트 결과 저장:', resultId);

        return {
            success: true,
            data: {
                resultId,
                savedAt: new Date().toISOString(),
                shareUrl: `https://aimbti.com/result/${resultId}`
            }
        };
    }

    /**
     * 실제 API로 결과 저장
     */
    async saveResultWithAPI(resultData) {
        const response = await fetch(`${this.apiUrl}/test/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(resultData)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || '결과 저장에 실패했습니다.');
        }

        const data = await response.json();
        return data;
    }

    /**
     * 사용자의 테스트 히스토리 조회
     */
    async getHistory(userToken, limit = 10) {
        if (!userToken) {
            throw new Error('사용자 토큰이 필요합니다.');
        }

        try {
            if (this.useMock) {
                return await this.getHistoryWithMock(userToken, limit);
            } else {
                return await this.getHistoryWithAPI(userToken, limit);
            }
        } catch (error) {
            console.error('History fetch error:', error);
            throw error;
        }
    }

    /**
     * Mock으로 히스토리 조회
     */
    async getHistoryWithMock(userToken, limit) {
        const savedResults = this.getSavedResults();
        const userResults = savedResults
            .filter(r => r.userToken === userToken)
            .slice(0, limit);

        return {
            success: true,
            data: {
                results: userResults,
                total: userResults.length
            }
        };
    }

    /**
     * 실제 API로 히스토리 조회
     */
    async getHistoryWithAPI(userToken, limit) {
        const response = await fetch(
            `${this.apiUrl}/test/history?userToken=${userToken}&limit=${limit}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || '히스토리 조회에 실패했습니다.');
        }

        const data = await response.json();
        return data;
    }

    /**
     * 로컬스토리지에서 저장된 결과 가져오기
     */
    getSavedResults() {
        const saved = localStorage.getItem('aimbti_results');
        return saved ? JSON.parse(saved) : [];
    }

    /**
     * 결과 ID 생성
     */
    generateResultId() {
        return 'result_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * 클라이언트 IP 가져오기 (근사치)
     */
    getClientIP() {
        // 실제로는 서버에서 처리해야 함
        return 'client';
    }
}
