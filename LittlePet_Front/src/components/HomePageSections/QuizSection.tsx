import React, { useState } from 'react';
import styled from 'styled-components';
import participantsIcon from '#/assets/Participants.svg';
import { quizData } from '#/mockData/quizdata';

const QuizSection: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [participantCount, setParticipantCount] = useState(1234);
  const [hasParticipated, setHasParticipated] = useState(false);

  // 사용자가 답을 선택했을 때 실행되는 함수
  const handleClick = (index: number) => {
    if (!hasParticipated) {
      const newCount = participantCount + 1; // 최신 값 계산
      setSelectedIndex(index);
      setShowAnswer(true);
      setIsSelected(true);
      setParticipantCount(newCount);
      setHasParticipated(true);
    }
  };

  return (
    <Container>
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
    </Container>
  );
};

export default QuizSection;

const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin-top: 24px;
  margin-left: 25px;
  margin-right: 25px;
  padding: 0 25px;
  @media (min-width: 768px) {
    padding: 0 96px;
  }
`;

const QuizContainer = styled.div<{ isSelected?: boolean }>`
  height: ${({ isSelected }) => (isSelected ? '357px' : '309px')};
  border-radius: 10px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: space-between;
  box-shadow: 0px 4px 10px #0000001a;
  @media (min-width: 768px) {
    gap: 24px;
    padding: 48px 64px;
    height: ${({ isSelected }) => (isSelected ? '561px' : '502px')};
  }
`;

const QuizQuesetion = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  @media (min-width: 768px) {
    gap: 20px;
  }
`;

const QuizTitle = styled.h1`
  font-size: 22px;
  font-weight: 700;
  line-height: 35px;
  margin: 0;
  @media (min-width: 768px) {
    font-size: 36px;
  }
`;

const Question = styled.h2`
  font-size: 16px;
  font-weight: 600;
  line-height: 35px;
  color: #737373;
  margin: 0;
  @media (min-width: 768px) {
    font-size: 26px;
  }
`;

const Answers = styled.div`
  gap: 8px;
  height: 139px;
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    height: 220px;
    gap: 20px;
  }
`;

const Choice = styled.button<{ isCorrect?: boolean; isSelected?: boolean }>`
  height: 41px;
  cursor: pointer;
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
  @media (min-width: 768px) {
    height: 60px;
    padding: 16px 24px;
    font-size: 24px;
    line-height: 35px;
  }
`;

const Explanation = styled.div`
  font-size: 12px;
  color: #6ea8fe;
  font-weight: 600;
  display: flex;
  align-items: center;
  @media (min-width: 768px) {
    font-size: 18px;
  }
`;

const Participants = styled.div`
  height: 24px;
  display: flex;
  align-items: center;
  @media (min-width: 768px) {
    height: 48px;
  }
`;

const ParticipantsIcon = styled.img`
  width: 36px;
  height: 24px;
  @media (min-width: 768px) {
    width: 48px;
  }
`;

const ParticipantsText = styled.p`
  font-size: 12px;
  font-weight: 600;
  color: #737373;
  @media (min-width: 768px) {
    font-size: 18px;
    line-height: 35px;
  }
`;
