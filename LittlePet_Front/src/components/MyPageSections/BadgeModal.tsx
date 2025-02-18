// components/BadgeModal.tsx
//import { useEffect } from 'react';
//import { useBadgeStore } from '#/context/BadgeStore';
import closeIcon from '#/assets/close.svg';
import logoIcon from '#/assets/logo.svg';
import styled from 'styled-components';
//import ChallengerBadge from '@assets/챌린저.svg';
import LikeBadge from '@assets/소셜응원왕.svg';
/* import MasterWriterBadge from '@assets/글쓰기마스터.svg';
import CommentBadge from '@assets/소통천재.svg';
import PopularBadge from '@assets/인기스타.svg'; */
/* const badgeIconMapping: { [key: string]: string } = {
    글쓰기마스터: MasterWriterBadge,
    소셜응원왕: LikeBadge,
    소통천재: CommentBadge,
    챌린저: ChallengerBadge,
    인기스타: PopularBadge,
  }; */
const BadgeModal = ({ onClose }) => {
  //const { newBadge, clearBadge } = useBadgeStore();

  return (
    <Overlay>
      <Container>
        <Icon src={closeIcon} onClick={onClose} />
        <Title>축하합니다! 뱃지를 획득했어요</Title>
        <Box>
          <img src={logoIcon} style={{ width: '50px' }} />
          <img src={LikeBadge} />
        </Box>
        <Text>
          <HighlightedText>챌린지 랭킹 3인</HighlightedText> 안에 들기
        </Text>
      </Container>
    </Overlay>
  );
};

export default BadgeModal;
const Container = styled.div`
  width: 343px;
  height: 233px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 43px 25px;
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
const Icon = styled.img`
  position: absolute;
  right: 15px;
  top: 15px;
`;
const Title = styled.div`
  font-size: 20px;
  font-family: Pretendard-SemiBold;
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
`;
const Text = styled.div`
  font-size: 12px;
  font-family: Pretendard-SemiBold;
  color: #737373;
`;
const HighlightedText = styled.span`
  font-size: 12px;
  font-family: Pretendard-SemiBold;
  color: #6ea8fe;
`;
