// AIMBTI - AI MBTI Personality Test
// https://github.com/hopegiver/aimbti


// src/ui/styles.js
var styles = `
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .aimbti-container {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
    }

    .aimbti-card {
        background: white;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        max-width: 800px;
        width: 100%;
        padding: 40px;
        animation: aimbti-fadeIn 0.5s ease-in;
    }

    @keyframes aimbti-fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .aimbti-title {
        color: #667eea;
        text-align: center;
        margin-bottom: 10px;
        font-size: 2.5em;
    }

    .aimbti-subtitle {
        text-align: center;
        color: #666;
        margin-bottom: 30px;
        font-size: 1.1em;
    }

    .aimbti-screen {
        display: none;
    }

    .aimbti-screen.active {
        display: block;
        animation: aimbti-fadeIn 0.5s ease-in;
    }

    .aimbti-button {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        padding: 15px 40px;
        font-size: 1.1em;
        border-radius: 50px;
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s;
        display: block;
        margin: 30px auto;
    }

    .aimbti-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
    }

    .aimbti-progress-bar {
        background: #e0e0e0;
        height: 8px;
        border-radius: 10px;
        margin-bottom: 30px;
        overflow: hidden;
    }

    .aimbti-progress-fill {
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        height: 100%;
        width: 0%;
        transition: width 0.3s ease;
    }

    .aimbti-question-container {
        margin: 30px 0;
    }

    .aimbti-question-text {
        font-size: 1.3em;
        color: #333;
        margin-bottom: 25px;
        text-align: center;
        font-weight: 500;
    }

    .aimbti-options {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .aimbti-option {
        background: #f5f5f5;
        border: 2px solid transparent;
        padding: 20px;
        border-radius: 15px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 1.05em;
        text-align: center;
    }

    .aimbti-option:hover {
        background: #e8e8ff;
        border-color: #667eea;
        transform: translateX(5px);
    }

    .aimbti-option.selected {
        background: #667eea;
        color: white;
        border-color: #667eea;
    }

    .aimbti-result-card {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 30px;
        border-radius: 20px;
        margin: 20px 0;
        text-align: center;
    }

    .aimbti-result-type {
        font-size: 3em;
        font-weight: bold;
        margin: 20px 0;
        letter-spacing: 5px;
    }

    .aimbti-result-title {
        font-size: 1.8em;
        margin-bottom: 15px;
    }

    .aimbti-result-description {
        font-size: 1.1em;
        line-height: 1.6;
        opacity: 0.95;
    }

    .aimbti-characteristics {
        background: #f9f9f9;
        padding: 25px;
        border-radius: 15px;
        margin: 20px 0;
    }

    .aimbti-characteristics h3 {
        color: #667eea;
        margin-bottom: 15px;
        font-size: 1.5em;
    }

    .aimbti-characteristics ul {
        list-style: none;
        padding-left: 0;
    }

    .aimbti-characteristics li {
        padding: 10px 0;
        color: #555;
        font-size: 1.05em;
        border-bottom: 1px solid #e0e0e0;
    }

    .aimbti-characteristics li:last-child {
        border-bottom: none;
    }

    .aimbti-characteristics li::before {
        content: "\u2713 ";
        color: #667eea;
        font-weight: bold;
        margin-right: 10px;
    }

    .aimbti-intro-text {
        text-align: center;
        color: #555;
        line-height: 1.8;
        margin: 20px 0;
        font-size: 1.1em;
    }

    @media (max-width: 600px) {
        .aimbti-card {
            padding: 20px;
        }

        .aimbti-title {
            font-size: 2em;
        }

        .aimbti-question-text {
            font-size: 1.1em;
        }

        .aimbti-result-type {
            font-size: 2em;
        }
    }
`;

// src/ui/components.js
var UIComponents = class {
  constructor(container) {
    this.container = container;
  }
  createStartScreen() {
    return `
            <div class="aimbti-screen active" id="aimbti-start-screen">
                <p class="aimbti-intro-text">
                    MBTI\uB294 \uC138\uACC4\uC5D0\uC11C \uAC00\uC7A5 \uB110\uB9AC \uC0AC\uC6A9\uB418\uB294 \uC131\uACA9 \uC720\uD615 \uAC80\uC0AC\uC785\uB2C8\uB2E4.<br>
                    12\uAC1C\uC758 \uC9C8\uBB38\uC744 \uD1B5\uD574 \uB2F9\uC2E0\uC758 \uC131\uACA9 \uC720\uD615\uC744 \uC54C\uC544\uBCF4\uC138\uC694!<br><br>
                    \uAC01 \uC9C8\uBB38\uC5D0 \uC194\uC9C1\uD558\uAC8C \uB2F5\uBCC0\uD574 \uC8FC\uC138\uC694.
                </p>
                <button class="aimbti-button" id="aimbti-start-button">\uD14C\uC2A4\uD2B8 \uC2DC\uC791\uD558\uAE30</button>
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
                    <h3>\uC8FC\uC694 \uD2B9\uC9D5</h3>
                    <ul id="aimbti-characteristics-list"></ul>
                </div>
                <button class="aimbti-button" id="aimbti-restart-button">\uB2E4\uC2DC \uD14C\uC2A4\uD2B8\uD558\uAE30</button>
            </div>
        `;
  }
  render() {
    this.container.innerHTML = `
            <div class="aimbti-card">
                <h1 class="aimbti-title">\u{1F9E0} MBTI \uC131\uACA9 \uC720\uD615 \uD14C\uC2A4\uD2B8</h1>
                <p class="aimbti-subtitle">\uB098\uB294 \uC5B4\uB5A4 \uC720\uD615\uC77C\uAE4C?</p>
                ${this.createStartScreen()}
                ${this.createQuestionScreen()}
                ${this.createResultScreen()}
            </div>
        `;
  }
  showScreen(screenId) {
    const screens = this.container.querySelectorAll(".aimbti-screen");
    screens.forEach((screen) => screen.classList.remove("active"));
    const targetScreen = this.container.querySelector(`#${screenId}`);
    if (targetScreen) {
      targetScreen.classList.add("active");
    }
  }
  updateProgress(current, total) {
    const progressBar = this.container.querySelector("#aimbti-progress-bar");
    const progress = (current + 1) / total * 100;
    progressBar.style.width = progress + "%";
  }
  renderQuestion(question) {
    const questionText = this.container.querySelector("#aimbti-question-text");
    const optionsContainer = this.container.querySelector("#aimbti-options");
    questionText.textContent = question.question;
    optionsContainer.innerHTML = "";
    question.options.forEach((option, index) => {
      const optionDiv = document.createElement("div");
      optionDiv.className = "aimbti-option";
      optionDiv.textContent = option.text;
      optionDiv.dataset.index = index;
      optionDiv.dataset.type = option.type;
      optionsContainer.appendChild(optionDiv);
    });
  }
  renderResult(mbtiType, result) {
    this.container.querySelector("#aimbti-result-type").textContent = mbtiType;
    this.container.querySelector("#aimbti-result-title").textContent = result.title;
    this.container.querySelector("#aimbti-result-description").textContent = result.description;
    const charList = this.container.querySelector("#aimbti-characteristics-list");
    charList.innerHTML = "";
    result.characteristics.forEach((char) => {
      const li = document.createElement("li");
      li.textContent = char;
      charList.appendChild(li);
    });
  }
};

// src/services/questions.js
var questions = [
  // E vs I (외향 vs 내향)
  {
    question: "\uCE5C\uAD6C\uB4E4\uACFC \uB9CC\uB0A8 \uD6C4 \uB098\uB294?",
    options: [
      { text: "\uC5D0\uB108\uC9C0\uAC00 \uCDA9\uC804\uB41C\uB2E4! \uB354 \uB180\uACE0 \uC2F6\uB2E4", type: "E" },
      { text: "\uC5D0\uB108\uC9C0\uAC00 \uC18C\uC9C4\uB41C\uB2E4. \uD63C\uC790 \uC26C\uACE0 \uC2F6\uB2E4", type: "I" }
    ]
  },
  {
    question: "\uC0C8\uB85C\uC6B4 \uC0AC\uB78C\uB4E4\uC744 \uB9CC\uB0A0 \uB54C \uB098\uB294?",
    options: [
      { text: "\uBA3C\uC800 \uB2E4\uAC00\uAC00\uC11C \uB9D0\uC744 \uAC74\uB2E4", type: "E" },
      { text: "\uC0C1\uB300\uBC29\uC774 \uBA3C\uC800 \uB9D0\uC744 \uAC78\uAE30\uB97C \uAE30\uB2E4\uB9B0\uB2E4", type: "I" }
    ]
  },
  {
    question: "\uC8FC\uB9D0\uC5D0 \uB098\uB294?",
    options: [
      { text: "\uCE5C\uAD6C\uB4E4\uACFC \uC57D\uC18D\uC744 \uC7A1\uACE0 \uBC16\uC5D0\uC11C \uB17C\uB2E4", type: "E" },
      { text: "\uC9D1\uC5D0\uC11C \uD63C\uC790\uB9CC\uC758 \uC2DC\uAC04\uC744 \uBCF4\uB0B8\uB2E4", type: "I" }
    ]
  },
  // S vs N (감각 vs 직관)
  {
    question: "\uBB38\uC81C\uB97C \uD574\uACB0\uD560 \uB54C \uB098\uB294?",
    options: [
      { text: "\uD604\uC7AC\uC758 \uC0AC\uC2E4\uACFC \uACBD\uD5D8\uC744 \uBC14\uD0D5\uC73C\uB85C \uD310\uB2E8\uD55C\uB2E4", type: "S" },
      { text: "\uAC00\uB2A5\uC131\uACFC \uBBF8\uB798\uB97C \uC0C1\uC0C1\uD558\uBA70 \uD310\uB2E8\uD55C\uB2E4", type: "N" }
    ]
  },
  {
    question: "\uB300\uD654\uD560 \uB54C \uB098\uB294?",
    options: [
      { text: "\uAD6C\uCCB4\uC801\uC774\uACE0 \uC2E4\uC9C8\uC801\uC778 \uC774\uC57C\uAE30\uB97C \uC120\uD638\uD55C\uB2E4", type: "S" },
      { text: "\uCD94\uC0C1\uC801\uC774\uACE0 \uAC1C\uB150\uC801\uC778 \uC774\uC57C\uAE30\uB97C \uC120\uD638\uD55C\uB2E4", type: "N" }
    ]
  },
  {
    question: "\uC0C8\uB85C\uC6B4 \uAC83\uC744 \uBC30\uC6B8 \uB54C \uB098\uB294?",
    options: [
      { text: "\uB2E8\uACC4\uBCC4\uB85C \uCC28\uADFC\uCC28\uADFC \uBC30\uC6B0\uB294 \uAC83\uC744 \uC120\uD638\uD55C\uB2E4", type: "S" },
      { text: "\uC804\uCCB4\uC801\uC778 \uADF8\uB9BC\uC744 \uBA3C\uC800 \uC774\uD574\uD558\uB824 \uD55C\uB2E4", type: "N" }
    ]
  },
  // T vs F (사고 vs 감정)
  {
    question: "\uCE5C\uAD6C\uAC00 \uACE0\uBBFC\uC744 \uD138\uC5B4\uB193\uC744 \uB54C \uB098\uB294?",
    options: [
      { text: "\uD574\uACB0 \uBC29\uBC95\uC744 \uB17C\uB9AC\uC801\uC73C\uB85C \uC81C\uC2DC\uD55C\uB2E4", type: "T" },
      { text: "\uACF5\uAC10\uD558\uACE0 \uC704\uB85C\uD574\uC900\uB2E4", type: "F" }
    ]
  },
  {
    question: "\uACB0\uC815\uC744 \uB0B4\uB9B4 \uB54C \uB098\uB294?",
    options: [
      { text: "\uAC1D\uAD00\uC801\uC774\uACE0 \uB17C\uB9AC\uC801\uC778 \uADFC\uAC70\uB97C \uC911\uC2DC\uD55C\uB2E4", type: "T" },
      { text: "\uB098\uC640 \uD0C0\uC778\uC758 \uAC10\uC815\uC744 \uC911\uC2DC\uD55C\uB2E4", type: "F" }
    ]
  },
  {
    question: "\uBE44\uD310\uC744 \uBC1B\uC744 \uB54C \uB098\uB294?",
    options: [
      { text: "\uAC1C\uC120\uC810\uC73C\uB85C \uBC1B\uC544\uB4E4\uC774\uACE0 \uBD84\uC11D\uD55C\uB2E4", type: "T" },
      { text: "\uAC10\uC815\uC801\uC73C\uB85C \uC0C1\uCC98\uBC1B\uB294\uB2E4", type: "F" }
    ]
  },
  // J vs P (판단 vs 인식)
  {
    question: "\uC5EC\uD589\uC744 \uACC4\uD68D\uD560 \uB54C \uB098\uB294?",
    options: [
      { text: "\uC77C\uC815\uACFC \uACC4\uD68D\uC744 \uBBF8\uB9AC \uC138\uC6B4\uB2E4", type: "J" },
      { text: "\uC989\uD765\uC801\uC73C\uB85C \uAC00\uACE0 \uC2F6\uC740 \uACF3\uC5D0 \uAC04\uB2E4", type: "P" }
    ]
  },
  {
    question: "\uC77C\uC744 \uC9C4\uD589\uD560 \uB54C \uB098\uB294?",
    options: [
      { text: "\uBBF8\uB9AC\uBBF8\uB9AC \uACC4\uD68D\uC801\uC73C\uB85C \uB05D\uB0B8\uB2E4", type: "J" },
      { text: "\uB9C8\uAC10 \uC9C1\uC804\uC5D0 \uBAB0\uC544\uC11C \uD55C\uB2E4", type: "P" }
    ]
  },
  {
    question: "\uB0B4 \uBC29 \uC0C1\uD0DC\uB294?",
    options: [
      { text: "\uD56D\uC0C1 \uC815\uB9AC\uC815\uB3C8\uC774 \uB418\uC5B4 \uC788\uB2E4", type: "J" },
      { text: "\uD544\uC694\uD55C \uAC83\uB9CC \uB300\uCDA9 \uC815\uB9AC\uD55C\uB2E4", type: "P" }
    ]
  }
];
var QuestionService = class {
  constructor() {
    this.questions = questions;
  }
  getQuestions() {
    return this.questions;
  }
  getQuestion(index) {
    return this.questions[index];
  }
  getTotalQuestions() {
    return this.questions.length;
  }
};

// src/services/results.js
var mbtiResults = {
  "ISTJ": {
    title: "\uC138\uC0C1\uC758 \uC18C\uAE08\uD615",
    description: "\uD55C\uBC88 \uC2DC\uC791\uD55C \uC77C\uC740 \uB05D\uAE4C\uC9C0 \uD574\uB0B4\uB294 \uC0AC\uB78C\uB4E4\uC785\uB2C8\uB2E4. \uCC45\uC784\uAC10\uC774 \uAC15\uD558\uACE0 \uCCA0\uC800\uD558\uBA70, \uC2E0\uB8B0\uD560 \uC218 \uC788\uB294 \uC131\uACA9\uC785\uB2C8\uB2E4.",
    characteristics: ["\uCCB4\uACC4\uC801\uC774\uACE0 \uC870\uC9C1\uC801", "\uCC45\uC784\uAC10\uC774 \uAC15\uD568", "\uD604\uC2E4\uC801\uC774\uACE0 \uC2E4\uC6A9\uC801", "\uC804\uD1B5\uACFC \uADDC\uCE59\uC744 \uC911\uC2DC", "\uC2E0\uB8B0\uC131\uC774 \uB192\uC74C"]
  },
  "ISFJ": {
    title: "\uC784\uAE08 \uB4A4\uD3B8\uC758 \uAD8C\uB825\uD615",
    description: "\uB530\uB73B\uD558\uACE0 \uD5CC\uC2E0\uC801\uC778 \uC0AC\uB78C\uB4E4\uC785\uB2C8\uB2E4. \uB2E4\uB978 \uC0AC\uB78C\uC744 \uB3D5\uB294 \uAC83\uC5D0 \uBCF4\uB78C\uC744 \uB290\uB07C\uBA70, \uC870\uD654\uB85C\uC6B4 \uD658\uACBD\uC744 \uB9CC\uB4ED\uB2C8\uB2E4.",
    characteristics: ["\uCE5C\uC808\uD558\uACE0 \uBC30\uB824\uC2EC\uC774 \uB9CE\uC74C", "\uCC45\uC784\uAC10\uC774 \uAC15\uD568", "\uC778\uB0B4\uC2EC\uC774 \uC788\uC74C", "\uC138\uC2EC\uD558\uACE0 \uAF3C\uAF3C\uD568", "\uD5CC\uC2E0\uC801\uC774\uACE0 \uCDA9\uC131\uC2A4\uB7EC\uC6C0"]
  },
  "INFJ": {
    title: "\uC608\uC5B8\uC790\uD615",
    description: "\uAE4A\uC740 \uD1B5\uCC30\uB825\uC744 \uAC00\uC9C4 \uC774\uC0C1\uC8FC\uC758\uC790\uC785\uB2C8\uB2E4. \uD0C0\uC778\uC744 \uC774\uD574\uD558\uACE0 \uB3D5\uB294 \uAC83\uC5D0 \uC5F4\uC815\uC801\uC774\uBA70, \uC758\uBBF8 \uC788\uB294 \uAD00\uACC4\uB97C \uCD94\uAD6C\uD569\uB2C8\uB2E4.",
    characteristics: ["\uD1B5\uCC30\uB825\uC774 \uB6F0\uC5B4\uB0A8", "\uC774\uC0C1\uC8FC\uC758\uC801", "\uCC3D\uC758\uC801\uC774\uACE0 \uB3C5\uCC3D\uC801", "\uD0C0\uC778\uC5D0 \uB300\uD55C \uAE4A\uC740 \uC774\uD574", "\uC644\uBCBD\uC8FC\uC758 \uC131\uD5A5"]
  },
  "INTJ": {
    title: "\uACFC\uD559\uC790\uD615",
    description: "\uC804\uB7B5\uC801\uC774\uACE0 \uB17C\uB9AC\uC801\uC778 \uC0AC\uACE0\uB97C \uD558\uB294 \uC0AC\uB78C\uB4E4\uC785\uB2C8\uB2E4. \uB3C5\uB9BD\uC801\uC774\uACE0 \uBD84\uC11D\uC801\uC774\uBA70, \uC7A5\uAE30\uC801\uC778 \uBE44\uC804\uC744 \uAC00\uC9C0\uACE0 \uC788\uC2B5\uB2C8\uB2E4.",
    characteristics: ["\uC804\uB7B5\uC801 \uC0AC\uACE0", "\uB3C5\uB9BD\uC801\uC774\uACE0 \uC790\uC728\uC801", "\uB17C\uB9AC\uC801\uC774\uACE0 \uBD84\uC11D\uC801", "\uBAA9\uD45C \uC9C0\uD5A5\uC801", "\uB192\uC740 \uAE30\uC900\uACFC \uC644\uBCBD\uC8FC\uC758"]
  },
  "ISTP": {
    title: "\uBC31\uACFC\uC0AC\uC804\uD615",
    description: "\uB17C\uB9AC\uC801\uC774\uACE0 \uC2E4\uC6A9\uC801\uC778 \uBB38\uC81C \uD574\uACB0\uC0AC\uC785\uB2C8\uB2E4. \uC190\uC7AC\uC8FC\uAC00 \uC88B\uACE0, \uC989\uD765\uC801\uC73C\uB85C \uC0C1\uD669\uC5D0 \uB300\uCC98\uD558\uB294 \uB2A5\uB825\uC774 \uB6F0\uC5B4\uB0A9\uB2C8\uB2E4.",
    characteristics: ["\uC2E4\uC6A9\uC801\uC774\uACE0 \uD604\uC2E4\uC801", "\uB17C\uB9AC\uC801 \uBD84\uC11D \uB2A5\uB825", "\uC190\uC7AC\uC8FC\uAC00 \uB6F0\uC5B4\uB0A8", "\uC801\uC751\uB825\uC774 \uB192\uC74C", "\uB3C5\uB9BD\uC801\uC774\uACE0 \uC790\uC720\uB85C\uC6C0"]
  },
  "ISFP": {
    title: "\uC131\uC778\uAD70\uC790\uD615",
    description: "\uC628\uD654\uD558\uACE0 \uCE5C\uC808\uD55C \uC608\uC220\uAC00 \uAE30\uC9C8\uC744 \uAC00\uC9C4 \uC0AC\uB78C\uB4E4\uC785\uB2C8\uB2E4. \uD604\uC7AC\uB97C \uC990\uAE30\uBA70, \uC870\uD654\uB85C\uC6B4 \uD658\uACBD\uC744 \uC120\uD638\uD569\uB2C8\uB2E4.",
    characteristics: ["\uCE5C\uC808\uD558\uACE0 \uC628\uD654\uD568", "\uC608\uC220\uC801 \uAC10\uAC01", "\uAC1C\uBC29\uC801\uC774\uACE0 \uC720\uC5F0\uD568", "\uD604\uC7AC \uC911\uC2EC\uC801", "\uD3C9\uD654\uB97C \uCD94\uAD6C\uD568"]
  },
  "INFP": {
    title: "\uC794\uB2E4\uB974\uD06C\uD615",
    description: "\uC774\uC0C1\uC8FC\uC758\uC801\uC774\uACE0 \uCDA9\uC131\uC2A4\uB7EC\uC6B4 \uC0AC\uB78C\uB4E4\uC785\uB2C8\uB2E4. \uC790\uC2E0\uC758 \uAC00\uCE58\uAD00\uC744 \uC911\uC2DC\uD558\uBA70, \uC758\uBBF8 \uC788\uB294 \uC0B6\uC744 \uCD94\uAD6C\uD569\uB2C8\uB2E4.",
    characteristics: ["\uC774\uC0C1\uC8FC\uC758\uC801", "\uCC3D\uC758\uC801\uC774\uACE0 \uC0C1\uC0C1\uB825\uC774 \uD48D\uBD80", "\uAC00\uCE58\uAD00\uC774 \uB69C\uB837\uD568", "\uACF5\uAC10 \uB2A5\uB825\uC774 \uB6F0\uC5B4\uB0A8", "\uAC1C\uC778\uC758 \uC131\uC7A5\uC744 \uC911\uC2DC"]
  },
  "INTP": {
    title: "\uC544\uC774\uB514\uC5B4 \uBC45\uD06C\uD615",
    description: "\uB17C\uB9AC\uC801\uC774\uACE0 \uBD84\uC11D\uC801\uC778 \uC0AC\uC0C9\uAC00\uC785\uB2C8\uB2E4. \uC9C0\uC801 \uD638\uAE30\uC2EC\uC774 \uB9CE\uACE0, \uC774\uB860\uACFC \uC544\uC774\uB514\uC5B4\uC5D0 \uAD00\uC2EC\uC774 \uB9CE\uC2B5\uB2C8\uB2E4.",
    characteristics: ["\uB17C\uB9AC\uC801\uC774\uACE0 \uBD84\uC11D\uC801", "\uD638\uAE30\uC2EC\uC774 \uB9CE\uC74C", "\uB3C5\uCC3D\uC801\uC778 \uC544\uC774\uB514\uC5B4", "\uAC1D\uAD00\uC801\uC774\uACE0 \uACF5\uC815\uD568", "\uC9C0\uC2DD \uCD94\uAD6C"]
  },
  "ESTP": {
    title: "\uC218\uC644 \uC88B\uC740 \uD65C\uB3D9\uAC00\uD615",
    description: "\uD65C\uB3D9\uC801\uC774\uACE0 \uD604\uC2E4\uC801\uC778 \uC0AC\uB78C\uB4E4\uC785\uB2C8\uB2E4. \uC21C\uAC04\uC744 \uC990\uAE30\uBA70, \uC704\uAE30 \uC0C1\uD669\uC5D0\uC11C \uBE60\uB974\uAC8C \uB300\uCC98\uD569\uB2C8\uB2E4.",
    characteristics: ["\uD65C\uB3D9\uC801\uC774\uACE0 \uC5D0\uB108\uC9C0 \uB118\uCE68", "\uD604\uC2E4\uC801\uC774\uACE0 \uC2E4\uC6A9\uC801", "\uC801\uC751\uB825\uC774 \uB6F0\uC5B4\uB0A8", "\uC21C\uBC1C\uB825\uC774 \uC88B\uC74C", "\uC0AC\uAD50\uC801\uC774\uACE0 \uCE5C\uADFC\uD568"]
  },
  "ESFP": {
    title: "\uC0AC\uAD50\uC801\uC778 \uC720\uD615",
    description: "\uC0AC\uB78C\uB4E4\uACFC \uC5B4\uC6B8\uB9AC\uB294 \uAC83\uC744 \uC88B\uC544\uD558\uB294 \uC790\uC720\uB85C\uC6B4 \uC601\uD63C\uC785\uB2C8\uB2E4. \uC990\uAC70\uC6C0\uC744 \uCD94\uAD6C\uD558\uBA70, \uBD84\uC704\uAE30 \uBA54\uC774\uCEE4 \uC5ED\uD560\uC744 \uD569\uB2C8\uB2E4.",
    characteristics: ["\uC0AC\uAD50\uC801\uC774\uACE0 \uCE5C\uADFC\uD568", "\uB099\uCC9C\uC801\uC774\uACE0 \uAE0D\uC815\uC801", "\uC989\uD765\uC801\uC774\uACE0 \uC720\uC5F0\uD568", "\uD0C0\uC778\uC5D0 \uB300\uD55C \uAD00\uC2EC", "\uD604\uC7AC\uB97C \uC990\uAE40"]
  },
  "ENFP": {
    title: "\uC2A4\uD30C\uD06C\uD615",
    description: "\uC5F4\uC815\uC801\uC774\uACE0 \uCC3D\uC758\uC801\uC778 \uC0AC\uB78C\uB4E4\uC785\uB2C8\uB2E4. \uC0C8\uB85C\uC6B4 \uAC00\uB2A5\uC131\uC5D0 \uC5F4\uB824 \uC788\uC73C\uBA70, \uC0AC\uB78C\uB4E4\uC5D0\uAC8C \uC601\uAC10\uC744 \uC90D\uB2C8\uB2E4.",
    characteristics: ["\uC5F4\uC815\uC801\uC774\uACE0 \uD65C\uAE30\uD568", "\uCC3D\uC758\uC801\uC774\uACE0 \uC0C1\uC0C1\uB825 \uD48D\uBD80", "\uC0AC\uAD50\uC801\uC774\uACE0 \uCE5C\uADFC\uD568", "\uAC00\uB2A5\uC131\uC744 \uCD94\uAD6C", "\uD638\uAE30\uC2EC\uC774 \uB9CE\uC74C"]
  },
  "ENTP": {
    title: "\uBC1C\uBA85\uAC00\uD615",
    description: "\uD601\uC2E0\uC801\uC774\uACE0 \uB3C4\uC804\uC801\uC778 \uC0AC\uACE0\uB97C \uD558\uB294 \uC0AC\uB78C\uB4E4\uC785\uB2C8\uB2E4. \uC0C8\uB85C\uC6B4 \uC544\uC774\uB514\uC5B4\uC640 \uAC00\uB2A5\uC131\uC744 \uD0D0\uAD6C\uD558\uB294 \uAC83\uC744 \uC990\uAE41\uB2C8\uB2E4.",
    characteristics: ["\uD601\uC2E0\uC801\uC774\uACE0 \uCC3D\uC758\uC801", "\uB17C\uB9AC\uC801\uC774\uACE0 \uBD84\uC11D\uC801", "\uB3C4\uC804\uC744 \uC990\uAE40", "\uC9C0\uC801 \uD638\uAE30\uC2EC", "\uC124\uB4DD\uB825\uC774 \uC788\uC74C"]
  },
  "ESTJ": {
    title: "\uC0AC\uC5C5\uAC00\uD615",
    description: "\uCCB4\uACC4\uC801\uC774\uACE0 \uC2E4\uC6A9\uC801\uC778 \uB9AC\uB354\uC785\uB2C8\uB2E4. \uD6A8\uC728\uC131\uC744 \uC911\uC2DC\uD558\uBA70, \uC870\uC9C1\uC744 \uC798 \uAD00\uB9AC\uD558\uB294 \uB2A5\uB825\uC774 \uC788\uC2B5\uB2C8\uB2E4.",
    characteristics: ["\uC870\uC9C1\uC801\uC774\uACE0 \uCCB4\uACC4\uC801", "\uACB0\uB2E8\uB825\uC774 \uC788\uC74C", "\uCC45\uC784\uAC10\uC774 \uAC15\uD568", "\uD6A8\uC728\uC131 \uCD94\uAD6C", "\uD604\uC2E4\uC801\uC774\uACE0 \uC2E4\uC6A9\uC801"]
  },
  "ESFJ": {
    title: "\uCE5C\uC120\uB3C4\uBAA8\uD615",
    description: "\uB530\uB73B\uD558\uACE0 \uD611\uB825\uC801\uC778 \uC0AC\uB78C\uB4E4\uC785\uB2C8\uB2E4. \uD0C0\uC778\uC744 \uB3D5\uB294 \uAC83\uC744 \uC88B\uC544\uD558\uBA70, \uC870\uD654\uB85C\uC6B4 \uAD00\uACC4\uB97C \uB9CC\uB4ED\uB2C8\uB2E4.",
    characteristics: ["\uCE5C\uC808\uD558\uACE0 \uD611\uB825\uC801", "\uCC45\uC784\uAC10\uC774 \uAC15\uD568", "\uC0AC\uAD50\uC801\uC774\uACE0 \uCE5C\uADFC\uD568", "\uC804\uD1B5\uACFC \uC9C8\uC11C \uC911\uC2DC", "\uD0C0\uC778 \uBC30\uB824"]
  },
  "ENFJ": {
    title: "\uC5B8\uBCC0\uB2A5\uC219\uD615",
    description: "\uCE74\uB9AC\uC2A4\uB9C8 \uC788\uB294 \uB9AC\uB354\uC785\uB2C8\uB2E4. \uD0C0\uC778\uC744 \uC774\uD574\uD558\uACE0 \uC601\uAC10\uC744 \uC8FC\uBA70, \uC0AC\uB78C\uB4E4\uC744 \uD558\uB098\uB85C \uBAA8\uC73C\uB294 \uB2A5\uB825\uC774 \uC788\uC2B5\uB2C8\uB2E4.",
    characteristics: ["\uCE74\uB9AC\uC2A4\uB9C8 \uC788\uC74C", "\uACF5\uAC10 \uB2A5\uB825\uC774 \uB6F0\uC5B4\uB0A8", "\uC774\uC0C1\uC8FC\uC758\uC801", "\uB9AC\uB354\uC2ED\uC774 \uAC15\uD568", "\uC124\uB4DD\uB825\uC774 \uC788\uC74C"]
  },
  "ENTJ": {
    title: "\uC9C0\uB3C4\uC790\uD615",
    description: "\uB300\uB2F4\uD558\uACE0 \uC804\uB7B5\uC801\uC778 \uB9AC\uB354\uC785\uB2C8\uB2E4. \uBAA9\uD45C \uC9C0\uD5A5\uC801\uC774\uBA70, \uD6A8\uC728\uC801\uC73C\uB85C \uC870\uC9C1\uC744 \uC774\uB044\uB294 \uB2A5\uB825\uC774 \uC788\uC2B5\uB2C8\uB2E4.",
    characteristics: ["\uB9AC\uB354\uC2ED\uC774 \uAC15\uD568", "\uC804\uB7B5\uC801 \uC0AC\uACE0", "\uACB0\uB2E8\uB825\uC774 \uC788\uC74C", "\uBAA9\uD45C \uC9C0\uD5A5\uC801", "\uD6A8\uC728\uC131 \uCD94\uAD6C"]
  }
};
var ResultService = class {
  constructor() {
    this.results = mbtiResults;
  }
  calculateResult(answers) {
    const mbtiType = (answers.E >= answers.I ? "E" : "I") + (answers.S >= answers.N ? "S" : "N") + (answers.T >= answers.F ? "T" : "F") + (answers.J >= answers.P ? "J" : "P");
    return {
      type: mbtiType,
      result: this.results[mbtiType]
    };
  }
  getResult(mbtiType) {
    return this.results[mbtiType];
  }
};

// src/services/auth.js
var AuthService = class {
  constructor(apiKey, options = {}) {
    this.apiKey = apiKey;
    this.apiUrl = options.apiUrl || "/mock-api/auth.json";
    this.useMock = options.useMock !== false;
    this.authData = null;
    this.isAuthenticated = false;
  }
  /**
   * 현재 도메인 가져오기
   */
  getCurrentDomain() {
    if (typeof window === "undefined") {
      return "localhost";
    }
    let hostname = window.location.hostname;
    if (hostname === "127.0.0.1") {
      hostname = "localhost";
    }
    return hostname;
  }
  /**
   * API 키 유효성 검증
   */
  async authenticate() {
    if (!this.apiKey) {
      throw new Error("API \uD0A4\uAC00 \uC81C\uACF5\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.");
    }
    try {
      const currentDomain = this.getCurrentDomain();
      if (this.useMock) {
        return await this.authenticateWithMock(currentDomain);
      } else {
        return await this.authenticateWithAPI(currentDomain);
      }
    } catch (error) {
      console.error("Authentication error:", error);
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
        throw new Error("Mock API\uB97C \uBD88\uB7EC\uC62C \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
      }
      const data = await response.json();
      const keyData = data.validKeys.find((k) => k.apiKey === this.apiKey);
      if (!keyData) {
        throw new Error(data.errors.invalid_key.message);
      }
      if (keyData.domain !== "*" && keyData.domain !== currentDomain) {
        throw new Error(data.errors.domain_mismatch.message);
      }
      const expiresAt = new Date(keyData.expiresAt);
      if (expiresAt < /* @__PURE__ */ new Date()) {
        throw new Error(data.errors.expired_key.message);
      }
      this.authData = keyData;
      this.isAuthenticated = true;
      console.log(`\u2713 \uC778\uC99D \uC131\uACF5: ${keyData.name} (${keyData.plan} \uD50C\uB79C)`);
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
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          apiKey: this.apiKey,
          domain: currentDomain,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        })
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "\uC778\uC99D\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
      }
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || "\uC778\uC99D\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
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
    if (this.authData.features.maxTests === -1) {
      return true;
    }
    return true;
  }
};

// src/services/session.js
var SessionService = class {
  constructor(apiKey, userToken, options = {}) {
    this.apiKey = apiKey;
    this.userToken = userToken;
    this.userId = options.userId || null;
    this.apiUrl = options.apiUrl || "/mock-api";
    this.useMock = options.useMock !== false;
    this.sessionId = null;
    this.sessionData = null;
  }
  /**
   * 테스트 세션 시작
   */
  async startSession() {
    if (!this.apiKey || !this.userToken) {
      throw new Error("API \uD0A4\uC640 \uC0AC\uC6A9\uC790 \uD1A0\uD070\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.");
    }
    try {
      if (this.useMock) {
        return await this.startSessionWithMock();
      } else {
        return await this.startSessionWithAPI();
      }
    } catch (error) {
      console.error("Session start error:", error);
      throw error;
    }
  }
  /**
   * Mock API로 세션 시작
   */
  async startSessionWithMock() {
    this.sessionId = this.generateSessionId();
    this.sessionData = {
      sessionId: this.sessionId,
      userId: this.userId,
      userToken: this.userToken,
      apiKey: this.apiKey,
      startedAt: (/* @__PURE__ */ new Date()).toISOString(),
      expiresAt: new Date(Date.now() + 36e5).toISOString()
      // 1시간 후
    };
    console.log("\u2713 \uD14C\uC2A4\uD2B8 \uC138\uC158 \uC2DC\uC791:", this.sessionId);
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
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        apiKey: this.apiKey,
        userToken: this.userToken,
        userId: this.userId,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      })
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "\uC138\uC158 \uC2DC\uC791\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
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
    return "session_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
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
    return expiresAt > /* @__PURE__ */ new Date();
  }
};

// src/services/storage.js
var StorageService = class {
  constructor(apiKey, options = {}) {
    this.apiKey = apiKey;
    this.apiUrl = options.apiUrl || "/mock-api";
    this.useMock = options.useMock !== false;
  }
  /**
   * 테스트 결과 저장
   */
  async saveResult(sessionId, userToken, result, answers) {
    if (!sessionId || !userToken) {
      throw new Error("\uC138\uC158 ID\uC640 \uC0AC\uC6A9\uC790 \uD1A0\uD070\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.");
    }
    const resultData = {
      sessionId,
      userToken,
      apiKey: this.apiKey,
      mbtiType: result.type,
      result: result.result,
      answers,
      completedAt: (/* @__PURE__ */ new Date()).toISOString(),
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
      console.error("Result save error:", error);
      throw error;
    }
  }
  /**
   * Mock으로 결과 저장
   */
  async saveResultWithMock(resultData) {
    const resultId = this.generateResultId();
    const savedResults = this.getSavedResults();
    savedResults.push({
      resultId,
      ...resultData,
      savedAt: (/* @__PURE__ */ new Date()).toISOString()
    });
    localStorage.setItem("aimbti_results", JSON.stringify(savedResults));
    console.log("\u2713 \uD14C\uC2A4\uD2B8 \uACB0\uACFC \uC800\uC7A5:", resultId);
    return {
      success: true,
      data: {
        resultId,
        savedAt: (/* @__PURE__ */ new Date()).toISOString(),
        shareUrl: `https://aimbti.com/result/${resultId}`
      }
    };
  }
  /**
   * 실제 API로 결과 저장
   */
  async saveResultWithAPI(resultData) {
    const response = await fetch(`${this.apiUrl}/test/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(resultData)
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "\uACB0\uACFC \uC800\uC7A5\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
    }
    const data = await response.json();
    return data;
  }
  /**
   * 사용자의 테스트 히스토리 조회
   */
  async getHistory(userToken, limit = 10) {
    if (!userToken) {
      throw new Error("\uC0AC\uC6A9\uC790 \uD1A0\uD070\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.");
    }
    try {
      if (this.useMock) {
        return await this.getHistoryWithMock(userToken, limit);
      } else {
        return await this.getHistoryWithAPI(userToken, limit);
      }
    } catch (error) {
      console.error("History fetch error:", error);
      throw error;
    }
  }
  /**
   * Mock으로 히스토리 조회
   */
  async getHistoryWithMock(userToken, limit) {
    const savedResults = this.getSavedResults();
    const userResults = savedResults.filter((r) => r.userToken === userToken).slice(0, limit);
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
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "\uD788\uC2A4\uD1A0\uB9AC \uC870\uD68C\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4.");
    }
    const data = await response.json();
    return data;
  }
  /**
   * 로컬스토리지에서 저장된 결과 가져오기
   */
  getSavedResults() {
    const saved = localStorage.getItem("aimbti_results");
    return saved ? JSON.parse(saved) : [];
  }
  /**
   * 결과 ID 생성
   */
  generateResultId() {
    return "result_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
  }
  /**
   * 클라이언트 IP 가져오기 (근사치)
   */
  getClientIP() {
    return "client";
  }
};

// src/aimbti.js
var AIMBTI = class {
  constructor(containerId, options = {}) {
    this.containerId = containerId;
    this.container = null;
    this.ui = null;
    this.questionService = new QuestionService();
    this.resultService = new ResultService();
    this.apiKey = options.apiKey;
    this.authService = null;
    this.isAuthenticated = false;
    this.userToken = options.userToken || null;
    this.userId = options.userId || null;
    this.sessionService = null;
    this.storageService = null;
    this.saveResults = options.saveResults !== false;
    this.onComplete = options.onComplete || null;
    this.onSave = options.onSave || null;
    this.currentQuestion = 0;
    this.answers = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    this.selectedOption = null;
  }
  async init() {
    if (this.apiKey) {
      try {
        this.authService = new AuthService(this.apiKey);
        await this.authService.authenticate();
        this.isAuthenticated = true;
      } catch (error) {
        this.showError("\uC778\uC99D \uC2E4\uD328", error.message);
        return;
      }
    }
    if (this.userToken && this.apiKey) {
      try {
        this.sessionService = new SessionService(this.apiKey, this.userToken, {
          userId: this.userId
        });
        await this.sessionService.startSession();
        this.storageService = new StorageService(this.apiKey);
      } catch (error) {
        console.warn("\uC138\uC158 \uC2DC\uC791 \uC2E4\uD328:", error);
      }
    }
    this.injectStyles();
    this.container = document.getElementById(this.containerId);
    if (!this.container) {
      console.error(`Container with id "${this.containerId}" not found`);
      return;
    }
    this.container.classList.add("aimbti-container");
    this.ui = new UIComponents(this.container);
    this.ui.render();
    this.attachEventListeners();
  }
  injectStyles() {
    const styleId = "aimbti-styles";
    if (document.getElementById(styleId)) {
      return;
    }
    const styleElement = document.createElement("style");
    styleElement.id = styleId;
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
  }
  attachEventListeners() {
    const startButton = this.container.querySelector("#aimbti-start-button");
    startButton.addEventListener("click", () => this.startTest());
    const restartButton = this.container.querySelector("#aimbti-restart-button");
    restartButton.addEventListener("click", () => this.restartTest());
  }
  startTest() {
    this.ui.showScreen("aimbti-question-screen");
    this.showQuestion();
  }
  showQuestion() {
    const question = this.questionService.getQuestion(this.currentQuestion);
    this.ui.renderQuestion(question);
    this.ui.updateProgress(this.currentQuestion, this.questionService.getTotalQuestions());
    const options = this.container.querySelectorAll(".aimbti-option");
    options.forEach((option) => {
      option.addEventListener("click", (e) => {
        this.selectOption(e.currentTarget);
      });
    });
    this.selectedOption = null;
  }
  selectOption(optionElement) {
    const options = this.container.querySelectorAll(".aimbti-option");
    options.forEach((opt) => opt.classList.remove("selected"));
    optionElement.classList.add("selected");
    const type = optionElement.dataset.type;
    this.selectedOption = type;
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
    if (this.saveResults && this.storageService && this.sessionService) {
      try {
        const sessionId = this.sessionService.getSessionId();
        const saveResponse = await this.storageService.saveResult(
          sessionId,
          this.userToken,
          { type, result },
          this.answers
        );
        if (this.onSave && typeof this.onSave === "function") {
          this.onSave(saveResponse.data);
        }
        console.log("\u2713 \uACB0\uACFC \uC800\uC7A5 \uC644\uB8CC:", saveResponse.data.resultId);
      } catch (error) {
        console.error("\uACB0\uACFC \uC800\uC7A5 \uC2E4\uD328:", error);
      }
    }
    this.ui.showScreen("aimbti-result-screen");
    this.ui.renderResult(type, result);
    if (this.onComplete && typeof this.onComplete === "function") {
      this.onComplete({ type, result, answers: this.answers });
    }
  }
  restartTest() {
    this.currentQuestion = 0;
    this.answers = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    this.selectedOption = null;
    this.ui.showScreen("aimbti-start-screen");
  }
  showError(title, message) {
    const container = document.getElementById(this.containerId);
    if (!container) return;
    container.innerHTML = `
            <div class="aimbti-container">
                <div class="aimbti-card">
                    <h1 class="aimbti-title" style="color: #dc3545;">\u26A0\uFE0F ${title}</h1>
                    <div class="aimbti-intro-text" style="color: #dc3545;">
                        ${message}
                    </div>
                </div>
            </div>
        `;
    this.injectStyles();
  }
};
window.initAIMBTI = function(containerId, options) {
  const app = new AIMBTI(containerId, options);
  app.init();
  return app;
};
export {
  AIMBTI
};
//# sourceMappingURL=aimbti.esm.js.map
