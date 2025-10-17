// UI Styles
export const styles = `
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
        content: "✓ ";
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
