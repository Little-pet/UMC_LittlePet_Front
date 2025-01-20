import React from 'react';
import styled from 'styled-components';
import ChallengerBadge from '@assets/ChallengerBadge.svg';
import PopularBadge from '@assets/PopularBadge.svg';

interface UserActivity {
  likes: number;
  posts: number;
  comments: number;
}

const badgeCriteria: { 
  [key: string]: { 
    condition: (user: UserActivity) => boolean; 
    label: string; 
    icon: string;
  } 
} = {
  popularChallenger: {
    condition: (user) => user.likes >= 100,
    label: '챌린저',
    icon: ChallengerBadge,
  },
  masterWriter: {
    condition: (user) => user.posts >= 15,
    label: '인기스타',
    icon: PopularBadge,
  },
  /* 배지 기준에 따라 수정, 추가 해야됨 */
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
  width: 343px;
  background-color: #FAFAFA;
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
