import React, { useState } from 'react';
import styled from 'styled-components';
import ChallengerBadge from '@assets/챌린저.svg';
import LikeBadge from '@assets/소셜응원왕.svg';
import MasterWriterBadge from '@assets/글쓰기마스터.svg';
import CommentBadge from '@assets/소통천재.svg';
import PopularBadge from '@assets/인기스타.svg';
import arrowIcon from '#/assets/arrow.svg';

const badges = [
  { name: '글쓰기마스터', component: MasterWriterBadge },
  { name: '소통천재', component: CommentBadge },
  { name: '소셜응원왕', component: LikeBadge },
  { name: '인기스타', component: PopularBadge },
  { name: '챌린저', component: ChallengerBadge },
];

const GoalBadgeComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const remainingPosts = 3;
  return (
    <BadgeContainer isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
      <Title>목표 뱃지</Title>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          width: '70%',
        }}
      >
        <Box>
          <Text>나의 목표 뱃지를 확인해볼까요?</Text>
          <ArrowIcon src={arrowIcon} alt='arrow' isOpen={isOpen} />
        </Box>
        {isOpen && (
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            <BadgeBox>
              <img src={MasterWriterBadge} />
              <Text>
                다음 목표까지 게시글 작성{' '}
                <HighlightedText>{remainingPosts}</HighlightedText>개 남았어요!
              </Text>
            </BadgeBox>
            <BadgeBox>
              <img src={CommentBadge} />
              <Text>
                다음 목표까지 댓글{' '}
                <HighlightedText>{remainingPosts}</HighlightedText>개 남았어요!
              </Text>
            </BadgeBox>
            <BadgeBox>
              <img src={LikeBadge} />
              <Text>
                다음 목표까지 좋아요 클릭{' '}
                <HighlightedText>{remainingPosts}</HighlightedText>개 남았어요!
              </Text>
            </BadgeBox>
            <BadgeBox>
              <img src={PopularBadge} />
              <Text>
                다음 목표까지 좋아요 획득{' '}
                <HighlightedText>{remainingPosts}</HighlightedText>개 남았어요!
              </Text>
            </BadgeBox>
            <BadgeBox>
              <img src={ChallengerBadge} />
              <Text>
                다음 목표를 위해{' '}
                <HighlightedText>챌린지 랭킹{remainingPosts}인</HighlightedText>
                에 도전해보세요!
              </Text>
            </BadgeBox>
          </div>
        )}
      </div>
    </BadgeContainer>
  );
};

export default GoalBadgeComponent;

const BadgeContainer = styled.div<{ isOpen: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  height: ${(props) => (props.isOpen ? '177px' : '50px')}; // 높이 변경
  width: 100%;
  background-color: #fafafa;
  padding: 12px 18px;
  gap: 12px;
  box-sizing: border-box;
  justify-content: flex-end;
`;

const Title = styled.div`
  position: absolute;
  top: 17px;
  left: 18px;
  font-size: 14px;
  font-weight: 600;
  color: #262627;
`;

const Box = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ArrowIcon = styled(({ isOpen, ...rest }) => <img {...rest} />)`
  width: 10px;
  transition: transform 0.3s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;
const BadgeBox = styled.div`
  display: flex;
  gap: 12px;
`;
const Text = styled.div`
  font-size: 8px;
  font-family: Pretendard-SemiBold;
  color: #737373;
`;
const HighlightedText = styled.span`
  font-size: 8px;
  font-family: Pretendard-SemiBold;
  color: #6ea8fe;
`;
