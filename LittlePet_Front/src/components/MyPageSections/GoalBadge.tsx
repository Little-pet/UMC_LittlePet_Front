import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ChallengerBadge from '@assets/챌린저.svg';
import LikeBadge from '@assets/소셜응원왕.svg';
import MasterWriterBadge from '@assets/글쓰기마스터.svg';
import CommentBadge from '@assets/소통천재.svg';
import PopularBadge from '@assets/인기스타.svg';
import arrowIcon from '#/assets/arrow.svg';
import { useAuthStore } from '#/store/AuthStore';
import { useBadgeStore } from '#/store/BadgeStore';
const badgeIconMapping: { [key: string]: string } = {
  글쓰기마스터: MasterWriterBadge,
  소셜응원왕: LikeBadge,
  소통천재: CommentBadge,
  챌린저: ChallengerBadge,
  인기스타: PopularBadge,
};

const GoalBadgeComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [progress, setProgress] = useState<{ [key: string]: string }>({});
  const userId = useAuthStore((state) => state.userId);
  const { fetchMissingBadge, fetchProgress, missingBadges } = useBadgeStore();
  useEffect(() => {
    fetchMissingBadge(userId);
  }, []);

  useEffect(() => {
    const fetchAllProgress = async (): Promise<void> => {
      const progressData: { [key: string]: string } = {};
      // badges 배열에 있는 각 badge에 대해 진행 상태를 가져옵니다.
      for (const badge of missingBadges ?? []) {
        try {
          const result = await fetchProgress(userId, badge);
          progressData[badge] = result || '';
        } catch (error) {
          console.log(error);
          progressData[badge] = '';
          console.log(error);
        }
      }
      setProgress(progressData);
    };

    fetchAllProgress();
  }, [missingBadges]);
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
            {(missingBadges ?? []).map((badge, idx) => {
              const icon = badgeIconMapping[badge];
              const word = progress[badge] ?? 0;
              const text = String(word);
              const match = text.match(/(.*?)(\d+)(.*)/);

              return (
                <BadgeBox key={idx}>
                  <img src={icon} />
                  <Text>
                    {match ? (
                      <>
                        {match[1]}
                        <HighlightedText>{match[2]}</HighlightedText>
                        {match[3]}
                      </>
                    ) : (
                      word // 숫자가 없으면 그대로 출력
                    )}
                  </Text>
                </BadgeBox>
              );
            })}
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
  height: ${(props) => (props.isOpen ? '' : '50px')}; // 높이 변경
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
const ArrowIcon = styled(({ ...rest }) => <img {...rest} />)`
  width: 10px;
  transition: transform 0.3s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;
const BadgeBox = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
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
