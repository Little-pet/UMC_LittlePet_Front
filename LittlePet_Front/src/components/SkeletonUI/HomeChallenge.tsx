import banner from '#/assets/banner/큐앤에이 배너.svg';
import styled from 'styled-components';

const HomeChallenge = () => {
  return (
    <Container>
      <Banner src={banner} />
      <ContentWrapper style={{ marginTop: '30px' }}>
        <HeaderWrapper>
          <SearchBar />
          <Header />
        </HeaderWrapper>
        <ChallengeWrapper>
          {new Array(2).fill('').map((_, i) => (
            <Card key={i} />
          ))}
        </ChallengeWrapper>
      </ContentWrapper>
    </Container>
  );
};
export default HomeChallenge;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 36px;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const Banner = styled.img`
  width: 100%;
  @media (max-width: 800px) {
    display: none;
  }
`;
const SearchBar = styled.div`
  width: 173px;
  height: 35px;
  border-radius: 5px;
  box-sizing: border-box;
  @keyframes skeleton-gradient {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }
  animation: skeleton-gradient 1.5s infinite ease-in-out;
`;
export const Header = styled.div`
  width: 282px;
  height: 64px;
  border-radius: 5px;
  @keyframes skeleton-gradient {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }
  animation: skeleton-gradient 1.5s infinite ease-in-out;
`;
export const HeaderFilter = styled.div`
  width: 74px;
  height: 22px;
  border-radius: 5px;
  @keyframes skeleton-gradient {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }
  animation: skeleton-gradient 1.5s infinite ease-in-out;
  @media (min-width: 800px) {
    width: 85px;
  }
`;

const ChallengeWrapper = styled.div`
  display: flex;
  gap: 10px;
  padding-left: 25px;
 overflow: hidden;
}
`;
const Card = styled.div`
  width: 200px;
  height: 240px;
  border-radius: 10px;
  @keyframes skeleton-gradient {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }
  animation: skeleton-gradient 1.5s infinite ease-in-out;
`;
export const FilterBox = styled.div`
  display: flex;
  margin-left: 25px;
  gap: 8px;
  @media only screen and (min-width: 800px) {
    margin-left: 90px;
  }
`;
const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 25px;
  @media only screen and (min-width: 800px) {
    padding: 0 96px;
  }
`;
