import React from 'react';
import styled from 'styled-components';
import ChallengerBadge from '@assets/챌린저.svg';
import LikeBadge from '@assets/소셜응원왕.svg';
import MasterWriterBadge from '@assets/글쓰기마스터.svg';
import CommentBadge from '@assets/소통천재.svg';

interface UserActivity {
  likeCount: number;
  postCount: number;
  commentCount: number;
  scrapCount: number;
}

const badgeCriteria: {
  [key: string]: {
    condition: (user: UserActivity) => boolean;
    label: string;
    icon: string;
  };
} = {
  LikeKing: {
    condition: (user) => user.likeCount >= 50,
    label: '소셜응원왕',
    icon: LikeBadge,
  },
  masterWriter: {
    condition: (user) => user.postCount >= 15,
    label: '글쓰기마스터',
    icon: MasterWriterBadge,
  },
  CommentGenius: {
    condition: (user) => user.commentCount >= 30,
    label: '소통천재',
    icon: CommentBadge,
  },
  Challenger: {
    condition: (user) => user.postCount >= 15,
    label: '챌린저',
    icon: ChallengerBadge,
  },
  /* 챌린저 배지 기준 수정 */
};

interface BadgeProps {
  user: UserActivity;
}

const BadgeComponent: React.FC<BadgeProps> = ({ user }) => {
  const userBadges = Object.keys(badgeCriteria)
    .filter((key) => badgeCriteria[key].condition(user))
    .map((key) => ({
      id: key,
      label: badgeCriteria[key].label,
      icon: badgeCriteria[key].icon,
    }));

  return (
    <BadgeContainer>
      <Title>나의 업적</Title>
      <BadgeList>
        {userBadges.map((badge) => (
          <BadgeIcon key={badge.id} src={badge.icon} alt={badge.label} />
        ))}
      </BadgeList>
    </BadgeContainer>
  );
};

export default BadgeComponent;

const BadgeContainer = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  background-color: #fafafa;
  padding: 12px 18px;
  gap: 12px;
  box-sizing: border-box;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #262627;
`;

const BadgeList = styled.div`
  display: flex;
  gap: 10px;
`;

const BadgeIcon = styled.img`
  height: 15px;
  width: auto;
`;
