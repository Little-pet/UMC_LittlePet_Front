type QuizData = {
  question: string; // 질문 텍스트
  choices: string[]; // 선지 배열
  correctIndex: number; // 정답의 인덱스
  explanation: string; // 정답 설명
};

export const quizData: QuizData = {
  question: '고슴도치의 학명은 무엇일까요?',
  choices: ['Goseumdochi', 'Hedgehog', 'Erinaceinae'],
  correctIndex: 2, // 정답의 인덱스 (3번째 선지)
  explanation:
    '고슴도치의 학명은 Erinaceinae로, 고슴도치아과에 속한 포유류의 총칭을 고슴도치라고 불러요.',
};
