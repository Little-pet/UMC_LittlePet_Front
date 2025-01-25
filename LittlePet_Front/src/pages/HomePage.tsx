import React from 'react';
import styled from 'styled-components';
import SearchBar from '#/components/searchBar';
import Carousel from '@components/HomePageSections/Carousel';
import ChallengeSection from '@components/HomePageSections/ChallengeSection';
import QuizSection from '@components/HomePageSections/QuizSection';
import PopularSection from '@components/HomePageSections/PopularSection';

const HomePage: React.FC = () => {
  return (
    <Container>
      <Carousel />
      <ContentContainer>
        <SearchBar text='찾으시는 커뮤니티 글이 있으신가요?' />
        <ChallengeSection />
        <QuizSection />
      </ContentContainer>
      <PopularSection />
    </Container>
  );
};

export default HomePage;

const Container = styled.div`
  width: 100%;
  margin-top: 24px;
`;

const ContentContainer = styled.div`
  box-sizing: border-box;
  padding-left: 25px;
  padding-right: 25px;
`;
