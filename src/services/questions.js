// MBTI Questions Service
export const questions = [
    // E vs I (외향 vs 내향)
    {
        question: "친구들과 만남 후 나는?",
        options: [
            { text: "에너지가 충전된다! 더 놀고 싶다", type: "E" },
            { text: "에너지가 소진된다. 혼자 쉬고 싶다", type: "I" }
        ]
    },
    {
        question: "새로운 사람들을 만날 때 나는?",
        options: [
            { text: "먼저 다가가서 말을 건다", type: "E" },
            { text: "상대방이 먼저 말을 걸기를 기다린다", type: "I" }
        ]
    },
    {
        question: "주말에 나는?",
        options: [
            { text: "친구들과 약속을 잡고 밖에서 논다", type: "E" },
            { text: "집에서 혼자만의 시간을 보낸다", type: "I" }
        ]
    },
    // S vs N (감각 vs 직관)
    {
        question: "문제를 해결할 때 나는?",
        options: [
            { text: "현재의 사실과 경험을 바탕으로 판단한다", type: "S" },
            { text: "가능성과 미래를 상상하며 판단한다", type: "N" }
        ]
    },
    {
        question: "대화할 때 나는?",
        options: [
            { text: "구체적이고 실질적인 이야기를 선호한다", type: "S" },
            { text: "추상적이고 개념적인 이야기를 선호한다", type: "N" }
        ]
    },
    {
        question: "새로운 것을 배울 때 나는?",
        options: [
            { text: "단계별로 차근차근 배우는 것을 선호한다", type: "S" },
            { text: "전체적인 그림을 먼저 이해하려 한다", type: "N" }
        ]
    },
    // T vs F (사고 vs 감정)
    {
        question: "친구가 고민을 털어놓을 때 나는?",
        options: [
            { text: "해결 방법을 논리적으로 제시한다", type: "T" },
            { text: "공감하고 위로해준다", type: "F" }
        ]
    },
    {
        question: "결정을 내릴 때 나는?",
        options: [
            { text: "객관적이고 논리적인 근거를 중시한다", type: "T" },
            { text: "나와 타인의 감정을 중시한다", type: "F" }
        ]
    },
    {
        question: "비판을 받을 때 나는?",
        options: [
            { text: "개선점으로 받아들이고 분석한다", type: "T" },
            { text: "감정적으로 상처받는다", type: "F" }
        ]
    },
    // J vs P (판단 vs 인식)
    {
        question: "여행을 계획할 때 나는?",
        options: [
            { text: "일정과 계획을 미리 세운다", type: "J" },
            { text: "즉흥적으로 가고 싶은 곳에 간다", type: "P" }
        ]
    },
    {
        question: "일을 진행할 때 나는?",
        options: [
            { text: "미리미리 계획적으로 끝낸다", type: "J" },
            { text: "마감 직전에 몰아서 한다", type: "P" }
        ]
    },
    {
        question: "내 방 상태는?",
        options: [
            { text: "항상 정리정돈이 되어 있다", type: "J" },
            { text: "필요한 것만 대충 정리한다", type: "P" }
        ]
    }
];

export class QuestionService {
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
}
