// AIMBTI Main Application
import { styles } from './ui/styles.js';
import { UIComponents } from './ui/components.js';
import { QuestionService } from './services/questions.js';
import { ResultService } from './services/results.js';
import { AuthService } from './services/auth.js';
import { SessionService } from './services/session.js';
import { StorageService } from './services/storage.js';

export class AIMBTI {
    constructor(containerId, options = {}) {
        this.containerId = containerId;
        this.container = null;
        this.ui = null;
        this.questionService = new QuestionService();
        this.resultService = new ResultService();

        // 인증 설정
        this.apiKey = options.apiKey;
        this.authService = null;
        this.isAuthenticated = false;

        // 사용자 세션 설정
        this.userToken = options.userToken || null;
        this.userId = options.userId || null;
        this.sessionService = null;
        this.storageService = null;

        // 결과 저장 설정
        this.saveResults = options.saveResults !== false; // 기본값 true
        this.onComplete = options.onComplete || null;
        this.onSave = options.onSave || null;

        this.currentQuestion = 0;
        this.answers = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
        this.selectedOption = null;
    }

    async init() {
        // 인증 처리
        if (this.apiKey) {
            try {
                this.authService = new AuthService(this.apiKey);
                await this.authService.authenticate();
                this.isAuthenticated = true;
            } catch (error) {
                this.showError('인증 실패', error.message);
                return;
            }
        }

        // 세션 시작 (userToken이 있는 경우)
        if (this.userToken && this.apiKey) {
            try {
                this.sessionService = new SessionService(this.apiKey, this.userToken, {
                    userId: this.userId
                });
                await this.sessionService.startSession();

                // Storage 서비스 초기화
                this.storageService = new StorageService(this.apiKey);
            } catch (error) {
                console.warn('세션 시작 실패:', error);
                // 세션 실패해도 테스트는 진행
            }
        }

        // Inject styles
        this.injectStyles();

        // Get container
        this.container = document.getElementById(this.containerId);
        if (!this.container) {
            console.error(`Container with id "${this.containerId}" not found`);
            return;
        }

        // Add aimbti-container class
        this.container.classList.add('aimbti-container');

        // Initialize UI
        this.ui = new UIComponents(this.container);
        this.ui.render();

        // Attach event listeners
        this.attachEventListeners();
    }

    injectStyles() {
        const styleId = 'aimbti-styles';

        // Check if styles already exist
        if (document.getElementById(styleId)) {
            return;
        }

        const styleElement = document.createElement('style');
        styleElement.id = styleId;
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
    }

    attachEventListeners() {
        // Start button
        const startButton = this.container.querySelector('#aimbti-start-button');
        startButton.addEventListener('click', () => this.startTest());

        // Restart button
        const restartButton = this.container.querySelector('#aimbti-restart-button');
        restartButton.addEventListener('click', () => this.restartTest());
    }

    startTest() {
        this.ui.showScreen('aimbti-question-screen');
        this.showQuestion();
    }

    showQuestion() {
        const question = this.questionService.getQuestion(this.currentQuestion);
        this.ui.renderQuestion(question);
        this.ui.updateProgress(this.currentQuestion, this.questionService.getTotalQuestions());

        // Attach option click listeners
        const options = this.container.querySelectorAll('.aimbti-option');
        options.forEach(option => {
            option.addEventListener('click', (e) => {
                this.selectOption(e.currentTarget);
            });
        });

        this.selectedOption = null;
    }

    selectOption(optionElement) {
        // Remove previous selection
        const options = this.container.querySelectorAll('.aimbti-option');
        options.forEach(opt => opt.classList.remove('selected'));

        // Add selection
        optionElement.classList.add('selected');

        const type = optionElement.dataset.type;
        this.selectedOption = type;

        // Auto-advance after 500ms
        setTimeout(() => {
            this.nextQuestion();
        }, 500);
    }

    nextQuestion() {
        if (this.selectedOption === null) return;

        this.answers[this.selectedOption]++;
        this.currentQuestion++;

        if (this.currentQuestion < this.questionService.getTotalQuestions()) {
            this.showQuestion();
        } else {
            this.showResult();
        }
    }

    async showResult() {
        const { type, result } = this.resultService.calculateResult(this.answers);

        // 결과 저장
        if (this.saveResults && this.storageService && this.sessionService) {
            try {
                const sessionId = this.sessionService.getSessionId();
                const saveResponse = await this.storageService.saveResult(
                    sessionId,
                    this.userToken,
                    { type, result },
                    this.answers
                );

                // 저장 콜백 호출
                if (this.onSave && typeof this.onSave === 'function') {
                    this.onSave(saveResponse.data);
                }

                console.log('✓ 결과 저장 완료:', saveResponse.data.resultId);
            } catch (error) {
                console.error('결과 저장 실패:', error);
                // 저장 실패해도 결과는 표시
            }
        }

        this.ui.showScreen('aimbti-result-screen');
        this.ui.renderResult(type, result);

        // 완료 콜백 호출
        if (this.onComplete && typeof this.onComplete === 'function') {
            this.onComplete({ type, result, answers: this.answers });
        }
    }

    restartTest() {
        this.currentQuestion = 0;
        this.answers = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
        this.selectedOption = null;

        this.ui.showScreen('aimbti-start-screen');
    }

    showError(title, message) {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        container.innerHTML = `
            <div class="aimbti-container">
                <div class="aimbti-card">
                    <h1 class="aimbti-title" style="color: #dc3545;">⚠️ ${title}</h1>
                    <div class="aimbti-intro-text" style="color: #dc3545;">
                        ${message}
                    </div>
                </div>
            </div>
        `;

        // Inject styles for error display
        this.injectStyles();
    }
}

// Global initialization function
window.initAIMBTI = function(containerId, options) {
    const app = new AIMBTI(containerId, options);
    app.init();
    return app;
};
