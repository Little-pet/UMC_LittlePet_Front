import banner from '#/assets/banner/챌린지 배너.svg';
import styled from 'styled-components';

const ChallengePost = () => {
  return (
    <Container>
      <Banner src={banner} />
      <ContentWrapper style={{ marginTop: '30px' }}>
        <HeaderWrapper>
          <SearchBar />
          <Header />
        </HeaderWrapper>
        <ChallengeWrapper>
          {new Array(3).fill('').map((_, i) => (
            <Card key={i} />
          ))}
        </ChallengeWrapper>
      </ContentWrapper>
      <ContentWrapper>
        <HeaderWrapper>
          <SearchBar />
          <Header />
        </HeaderWrapper>
        <FilterBox>
          <HeaderFilter />
          <HeaderFilter />
        </FilterBox>
        <ItemList>
          {new Array(2).fill('').map((_, i) => (
            <Item key={i} />
          ))}
        </ItemList>
      </ContentWrapper>
    </Container>
  );
};
export default ChallengePost;
const Item = styled.div`
  width: 165px;
  height: 140px;
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
  @media (min-width: 800px) {
    margin-left: 96px;
  }
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
  width: 100%;
  display: flex;
  gap: 10px;
  padding-left: 25px;
 overflow: hidden;
  @media (min-width: 800px) {
    padding: 0;
  }
}
`;
const Card = styled.div`
  width: 200px;
  height: 240px;
  border-radius: 10px;
  flex-shrink: 0;
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
    width: 400px;
    height: 480px;
  }
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
  @media (min-width: 800px) {
    padding: 0;
  }
`;
const ItemList = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 25px;
  flex-wrap: wrap;
  @media only screen and (min-width: 700px) {
    padding: 0 96px;
  }
`;
