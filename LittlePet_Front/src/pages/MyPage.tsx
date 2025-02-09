import React from 'react';
import styled from 'styled-components';
import StatsComponent from '@components/MyPageSections/CategoryBar';
import BadgeComponent from '@components/MyPageSections/BadgeLists';
import Menu from '@components/MyPageSections/Menu';
import PetProfiles from '@components/MyPageSections/PetProfiles';
import ProfileSection from '@components/MyPageSections/ProfileSection';
import { useGetUserData } from '#/hooks/useGetUserData';
import { usePetStore } from '#/context/UserStore';

const MyPage: React.FC = () => {
  const userId = 4;
  const { isLoading, error } = useGetUserData(userId);
  const stats = usePetStore((state) => state.stats);

  return (
    <Container>
      <Title>마이페이지</Title>
      <ProfileContainer>
        <ProfileSection isLoading={isLoading} />
        <StatsComponent user={stats} isLoading={isLoading} />
        <PetProfiles isLoading={isLoading} />
        <BadgeComponent user={stats} isLoading={isLoading} />
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
