import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ChallengerBadge from '@assets/챌린저.svg';
import LikeBadge from '@assets/소셜응원왕.svg';
import MasterWriterBadge from '@assets/글쓰기마스터.svg';
import CommentBadge from '@assets/소통천재.svg';
import PopularBadge from '@assets/인기스타.svg';
import arrowIcon from '#/assets/arrow.svg';
import axios from 'axios';
import { useAuthStore } from '#/context/AuthStore';
const badgeIconMapping: { [key: string]: string } = {
  글쓰기마스터: MasterWriterBadge,
  소셜응원왕: LikeBadge,
  소통천재: CommentBadge,
  챌린저: ChallengerBadge,
  인기스타: PopularBadge,
};

const GoalBadgeComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [badges, setBadges] = useState<string[]>([]);
  const [progress, setProgress] = useState<{ [key: string]: number }>({});
  const userId = useAuthStore((state) => state.userId);
  const remainingPosts = 3;
  useEffect(() => {
    const fetchMissingBadge = async () => {
      try {
        const response = await axios.get(
          `https://umclittlepet.shop/api/badge/${userId}/missingbadge`,
          { withCredentials: true }
        );
        console.log('획득하지 못한 뱃지 조회 성공', response.data);
        setBadges(response.data.result);
      } catch (error) {
        console.error('획득하지 못한 뱃지 조회 실패:', error);
      }
    };
    fetchMissingBadge();
  }, []);
  const fetchProgress = async (type: string) => {
    try {
      const response = await axios.get(
        `https://umclittlepet.shop/api/badge/${userId}/${type}/progress`,
        { withCredentials: true }
      );
      console.log(type, '목표 뱃지 조회 성공', response.data);
      return response.data.result;
    } catch (error) {
      console.error(type, '목표 뱃지 조회 실패:', error);
    }
  };

  useEffect(() => {
    const fetchAllProgress = async () => {
      const progressData: { [key: string]: number } = {};
      // badges 배열에 있는 각 badge에 대해 진행 상태를 가져옵니다.
      for (const badge of badges ?? []) {
        try {
          const result = await fetchProgress(badge);
          progressData[badge] = result || 0;
        } catch (error) {
          console.log(error);
          progressData[badge] = 0;
          console.log(error);
        }
      }
      setProgress(progressData);
    };

    fetchAllProgress();
  }, [badges]);
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
            {(badges ?? []).map((badge, idx) => {
              const icon = badgeIconMapping[badge];
              const word = String(progress[badge] ?? 0);
              const match = word.match(/(.*?)(\d+)(.*)/);

              return (
                <BadgeBox key={idx}>
                  <img src={icon} />
                  <Text>
                    {match[1]}
                    <HighlightedText>{match[2]}</HighlightedText>
                    {match[3]}
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
