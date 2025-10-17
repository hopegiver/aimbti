// UI Components
export class UIComponents {
    constructor(container) {
        this.container = container;
    }

    createStartScreen() {
        return `
            <div class="aimbti-screen active" id="aimbti-start-screen">
                <p class="aimbti-intro-text">
                    MBTI는 세계에서 가장 널리 사용되는 성격 유형 검사입니다.<br>
                    12개의 질문을 통해 당신의 성격 유형을 알아보세요!<br><br>
                    각 질문에 솔직하게 답변해 주세요.
                </p>
                <button class="aimbti-button" id="aimbti-start-button">테스트 시작하기</button>
            </div>
        `;
    }

    createQuestionScreen() {
        return `
            <div class="aimbti-screen" id="aimbti-question-screen">
                <div class="aimbti-progress-bar">
                    <div class="aimbti-progress-fill" id="aimbti-progress-bar"></div>
                </div>
                <div class="aimbti-question-container">
                    <p class="aimbti-question-text" id="aimbti-question-text"></p>
                    <div class="aimbti-options" id="aimbti-options"></div>
                </div>
            </div>
        `;
    }

    createResultScreen() {
        return `
            <div class="aimbti-screen" id="aimbti-result-screen">
                <div class="aimbti-result-card">
                    <div class="aimbti-result-type" id="aimbti-result-type"></div>
                    <div class="aimbti-result-title" id="aimbti-result-title"></div>
                    <div class="aimbti-result-description" id="aimbti-result-description"></div>
                </div>
                <div class="aimbti-characteristics">
                    <h3>주요 특징</h3>
                    <ul id="aimbti-characteristics-list"></ul>
                </div>
                <button class="aimbti-button" id="aimbti-restart-button">다시 테스트하기</button>
            </div>
        `;
    }

    render() {
        this.container.innerHTML = `
            <div class="aimbti-card">
                <h1 class="aimbti-title">🧠 MBTI 성격 유형 테스트</h1>
                <p class="aimbti-subtitle">나는 어떤 유형일까?</p>
                ${this.createStartScreen()}
                ${this.createQuestionScreen()}
                ${this.createResultScreen()}
            </div>
        `;
    }

    showScreen(screenId) {
        const screens = this.container.querySelectorAll('.aimbti-screen');
        screens.forEach(screen => screen.classList.remove('active'));

        const targetScreen = this.container.querySelector(`#${screenId}`);
        if (targetScreen) {
            targetScreen.classList.add('active');
        }
    }

    updateProgress(current, total) {
        const progressBar = this.container.querySelector('#aimbti-progress-bar');
        const progress = ((current + 1) / total) * 100;
        progressBar.style.width = progress + '%';
    }

    renderQuestion(question) {
        const questionText = this.container.querySelector('#aimbti-question-text');
        const optionsContainer = this.container.querySelector('#aimbti-options');

        questionText.textContent = question.question;
        optionsContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'aimbti-option';
            optionDiv.textContent = option.text;
            optionDiv.dataset.index = index;
            optionDiv.dataset.type = option.type;
            optionsContainer.appendChild(optionDiv);
        });
    }

    renderResult(mbtiType, result) {
        this.container.querySelector('#aimbti-result-type').textContent = mbtiType;
        this.container.querySelector('#aimbti-result-title').textContent = result.title;
        this.container.querySelector('#aimbti-result-description').textContent = result.description;

        const charList = this.container.querySelector('#aimbti-characteristics-list');
        charList.innerHTML = '';
        result.characteristics.forEach(char => {
            const li = document.createElement('li');
            li.textContent = char;
            charList.appendChild(li);
        });
    }
}
