import React from 'react';
import styled from 'styled-components';
import ChallengerBadge from '@assets/챌린저.svg';
import LikeBadge from '@assets/소셜응원왕.svg';
import MasterWriterBadge from '@assets/글쓰기마스터.svg';
import CommentBadge from '@assets/소통천재.svg';
import PopularBadge from '@assets/인기스타.svg';

interface Badge {
  name: string;
}

interface BadgeProps {
  badges: Badge[];
}

const badgeIconMapping: { [key: string]: string } = {
  글쓰기마스터: MasterWriterBadge,
  소셜응원왕: LikeBadge,
  소통천재: CommentBadge,
  챌린저: ChallengerBadge,
  인기스타: PopularBadge,
};

const BadgeComponent: React.FC<BadgeProps> = ({ badges }) => {
  return (
    <BadgeContainer>
      <Title>나의 업적</Title>
      <DesktopTitle>나의 업적 🎖️</DesktopTitle>
      <BadgeList>
        {badges.map((badge, idx) => {
          const icon = badgeIconMapping[badge.name];
          if (!icon) return null;
          return <BadgeIcon key={idx} src={icon} alt={badge.name} />;
        })}
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
  @media only screen and (min-width: 800px) {
    gap: 80px;
  }
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #262627;
  @media only screen and (min-width: 800px) {
    display: none;
  }
`;
const DesktopTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #262627;
  @media only screen and (max-width: 800px) {
    display: none;
  }
`;
const BadgeList = styled.div`
  display: flex;
  gap: 10px;
  @media only screen and (min-width: 800px) {
    gap: 30px;
  }
`;

const BadgeIcon = styled.img`
  height: 15px;
  width: auto;
`;
