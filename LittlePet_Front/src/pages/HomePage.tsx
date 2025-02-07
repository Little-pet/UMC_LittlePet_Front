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
        <SearchBarContainer>
          <SearchBar placeholder='찾으시는 커뮤니티 글이 있으신가요?' />
        </SearchBarContainer>
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
`;

const ContentContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SearchBarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
