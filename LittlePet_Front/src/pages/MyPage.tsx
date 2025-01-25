import React from 'react';
import styled from 'styled-components';
import StatsComponent from '@components/MyPageSections/CategoryBar';
import BadgeComponent from '@components/MyPageSections/BadgeLists';
import Menu from '@components/MyPageSections/Menu';
import PetProfiles from '@components/MyPageSections/PetProfiles';
import ProfileSection from '@components/MyPageSections/ProfileSection';

const MyPage: React.FC = () => {
  /*추후 백엔드와 연동*/
  const userActivity = {
    likes: 0,
    posts: 0,
    comments: 0,
    scrape: 0,
  };

  return (
    <Container>
      <Title>마이페이지</Title>
      <ProfileContainer>
        <ProfileSection />
        <StatsComponent user={userActivity} />
        <PetProfiles />
        <BadgeComponent user={userActivity} />
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
`;

const Title = styled.p`
  text-align: center;
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 22px;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 23px;
`;
