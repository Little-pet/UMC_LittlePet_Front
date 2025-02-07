import styled from 'styled-components';
import blankStarIcon from '#/assets/blank_star.svg';
import starIcon from '#/assets/star.svg';
import React, { useState } from 'react';
// Props 타입 정의
interface StarModalProps {
  onClose: () => void; // 모달 닫기 콜백 함수
  setStar: (starScore: number) => void; // 별점 설정 콜백 함수
}
const StarModal: React.FC<StarModalProps> = ({ onClose, setStar }) => {
  const [starScore, setStarScore] = useState<number>(0);
  return (
    <Overlay onClick={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Title>별을 클릭하세요</Title>
        <StarContainer>
          {[...Array(5)].map((_, i) =>
            i + 1 <= starScore ? (
              <img
                key={i}
                src={starIcon}
                onClick={() => setStarScore(i + 1)}
                alt='star'
                style={{ width: '40px', cursor: 'pointer' }}
              />
            ) : (
              <img
                key={i}
                src={blankStarIcon}
                onClick={() => setStarScore(i + 1)}
                alt='blank star'
                style={{ width: '40px', cursor: 'pointer' }}
              />
            )
          )}
        </StarContainer>
        <ButtonContainer>
          <Button
            onClick={() => {
              setStar(starScore);
              onClose();
            }}
          >
            확인
          </Button>
          <Button
            style={{ backgroundColor: '#E6E6E6', color: '#737373' }}
            onClick={onClose}
          >
            취소
          </Button>
        </ButtonContainer>
      </Container>
    </Overlay>
  );
};
export default StarModal;
const Container = styled.div`
  width: 343px;
  height: 231px;
  background-color: #ffffff;
  border-radius: 15px;
  padding: 35px 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  /* 화면에 꽉 차게 하는 코드(여기서는 너비를 꽉 채우는 용도) */
  position: fixed;
  top: 50%;
  left: 50%;

  /* 위아래 너비를 준 상태에서 가로 50%, 세로 50%를 이동시킬 수 있다 (= 한가운데 배치) */
  transform: translate(-50%, -50%);
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명한 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* 다른 요소 위에 표시 */
`;
const Title = styled.div`
  font-size: 20px;
  font-family: 'Pretendard-SemiBold', sans-serif;
  margin-bottom: 16px;
`;
const StarContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
`;
const Button = styled.div`
  width: 75px;
  height: 42px;
  border-radius: 5px;
  background-color: #6ea8fe;
  color: white;
  font-size: 16px;
  font-family: Pretendard-SemiBold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`;
