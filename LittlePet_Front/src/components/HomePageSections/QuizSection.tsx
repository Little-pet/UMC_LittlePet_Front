import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import participantsIcon from '#/assets/Participants.svg';
import { quizData } from '#/mockData/quizdata';

const QuizSection: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [participantCount, setParticipantCount] = useState(1234);
  const [hasParticipated, setHasParticipated] = useState(false);

  // 컴포넌트가 처음 렌더링될 때 로컬 스토리지에서 값 읽기
  useEffect(() => {
    const storedIndex = localStorage.getItem('quizSelectedIndex');
    const storedHasParticipated = localStorage.getItem('hasParticipated');
    const storedCount = localStorage.getItem('participantCount');

    if (storedIndex) setSelectedIndex(Number(storedIndex));
    if (storedHasParticipated === 'true') setHasParticipated(true);
    if (storedCount) setParticipantCount(Number(storedCount));

    if (storedIndex !== null) {
      setShowAnswer(true);
      setIsSelected(true);
    }
  }, []);

  // 사용자가 답을 선택했을 때 실행되는 함수
  const handleClick = (index: number) => {
    if (!hasParticipated) {
      const newCount = participantCount + 1; // 최신 값 계산
      setSelectedIndex(index);
      setShowAnswer(true);
      setIsSelected(true);
      setParticipantCount(newCount);
      setHasParticipated(true);

      // 로컬 스토리지에 상태 저장
      localStorage.setItem('quizSelectedIndex', index.toString());
      localStorage.setItem('hasParticipated', 'true');
      localStorage.setItem('participantCount', newCount.toString());
    }
  };

  return (
    <QuizContainer isSelected={isSelected}>
      <QuizQuesetion>
        <QuizTitle>오늘의 퀴즈</QuizTitle>
        <Question>{quizData.question}</Question>
      </QuizQuesetion>
      <Answers>
        {quizData.choices.map((choice, index) => (
          <Choice
            key={index}
            onClick={() => handleClick(index)}
            isCorrect={showAnswer && index === quizData.correctIndex}
            isSelected={
              showAnswer &&
              index === selectedIndex &&
              index !== quizData.correctIndex
            }
          >
            {`${index + 1}) ${choice}`}
          </Choice>
        ))}
      </Answers>
      {showAnswer && <Explanation>{quizData.explanation}</Explanation>}
      <Participants>
        <ParticipantsIcon src={participantsIcon} alt='Participants Icon' />
        <ParticipantsText>
          {participantCount}명의 사람들이 퀴즈에 참여했어요
        </ParticipantsText>
      </Participants>
    </QuizContainer>
  );
};

export default QuizSection;

const QuizContainer = styled.div<{ isSelected?: boolean }>`
  height: ${({ isSelected }) => (isSelected ? '357px' : '309px')};
  box-sizing: border-box;
  border-radius: 10px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 24px;
  box-shadow: 0px 4px 10px #0000001a;
  margin-left: 25px;
  margin-right: 25px;
  @media (min-width: 768px) {
    margin: 0 96px;
    margin-top: 24px;
  }
`;

const QuizQuesetion = styled.div`
  height: 74px;
`;

const QuizTitle = styled.h1`
  font-size: 22px;
  font-weight: 700;
  line-height: 35px;
  margin: 0;
`;

const Question = styled.h2`
  font-size: 16px;
  font-weight: 600;
  line-height: 35px;
  color: #737373;
  margin: 0;
`;

const Answers = styled.div`
  gap: 8px;
  height: 139px;
  display: flex;
  flex-direction: column;
`;

const Choice = styled.button<{ isCorrect?: boolean; isSelected?: boolean }>`
  height: 41px;
  border-radius: 10px;
  border: 1px solid
    ${({ isCorrect, isSelected }) =>
      isCorrect ? '#98D298' : isSelected ? '#C76B6B' : '#e6e6e6'};
  padding: 12px 24px;
  font-size: 12px;
  color: ${({ isCorrect, isSelected }) =>
    isCorrect ? '#98D298' : isSelected ? '#C76B6B' : '#737373'};
  text-align: left;
  background-color: #ffffff;
  font-family: 'Pretendard';
  font-weight: 500;
`;

const Explanation = styled.div`
  font-size: 12px;
  color: #6ea8fe;
  font-weight: 600;
  line-height: 18px;
`;

const Participants = styled.div`
  height: 24px;
  display: flex;
  align-items: center;
`;

const ParticipantsIcon = styled.img`
  width: 36px;
  height: 24px;
`;

const ParticipantsText = styled.p`
  font-size: 12px;
  font-weight: 600;
  color: #737373;
`;
