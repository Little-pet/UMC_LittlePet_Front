import React from 'react';
import styled from 'styled-components';
import StatsComponent from '@components/MyPageSections/CategoryBar';
import BadgeComponent from '@components/MyPageSections/BadgeLists';
import Menu from '@components/MyPageSections/Menu';
import PetProfiles from '@components/MyPageSections/PetProfiles';
import ProfileSection from '@components/MyPageSections/ProfileSection';
import { useGetUserData } from '#/hooks/useGetUserData';
import { useUserStore } from '#/context/UserStore';

const MyPage: React.FC = () => {
  const userId = 4;
  const { isLoading /*, error */ } = useGetUserData(userId);
  const stats = useUserStore((state) => state.stats);
  const badges = useUserStore((state) => state.badges);
  //const user = useUserStore((state) => state.user);
  const pets = useUserStore((state) => state.pets);

  return (
    <Container>
      <Title>마이페이지</Title>
      <ProfileContainer>
        <ProfileSection /*user={user} pets={pets} isLoading={isLoading}*/ />
        <StatsComponent user={stats} isLoading={isLoading} />
        <PetProfiles pets={pets} isLoading={isLoading} />
        <BadgeComponent badges={badges} isLoading={isLoading} />
      </ProfileContainer>
      <Menu></Menu>
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
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 23px;
  width: 100%;
`;
