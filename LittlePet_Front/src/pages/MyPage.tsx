import React, { useEffect } from 'react';
import styled from 'styled-components';
import StatsComponent from '@components/MyPageSections/CategoryBar';
import BadgeComponent from '@components/MyPageSections/BadgeLists';
import Menu from '@components/MyPageSections/Menu';
import PetProfiles from '@components/MyPageSections/PetProfiles';
import ProfileSection from '@components/MyPageSections/ProfileSection';
import { useUserStore } from '#/context/UserStore';
import GoalBadgeComponent from '@components/MyPageSections/GoalBadge';
import { useAuthStore } from '#/context/AuthStore';

const MyPage: React.FC = () => {
  const userId = useAuthStore((state) => state.userId);
  const {
    fetchUser = () => {},
    stats = {
      likeCount: 0,
      commentCount: 0,
      postCount: 0,
      reviewCount: 0,
      scrapCount: 0,
    },
    badges = [],
    pets = [],
    isLoading = false,
  } = useUserStore();

  useEffect(() => {
    console.log('[MyPage] useEffect 실행됨', { userId, pets });

    fetchUser(userId);
  }, [userId, pets]);

  return (
    <Container>
      <Title>마이페이지</Title>
      <ProfileContainer>
        <ProfileSection />
        <StatsComponent user={stats} />
        <PetProfiles pets={pets} isLoading={isLoading} />
        <BadgeComponent badges={badges} isLoading={isLoading} />
        <GoalBadgeComponent />
      </ProfileContainer>
      <Menu />
    </Container>
  );
};

export default MyPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  width: 100%;
  padding: 0 25px;
  margin-top: 5px;
  box-sizing: border-box;
  @media (min-width: 800px) {
    padding: 0 96px;
  }
`;
const Title = styled.p`
  text-align: center;
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 22px;
  margin-bottom: 0;
  @media only screen and (min-width: 800px) {
    display: none;
  }
`;
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 23px;
  width: 100%;
`;
