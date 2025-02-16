import banner from '#/assets/banner/큐앤에이 배너.svg';
import styled from 'styled-components';
import {
  Container,
  ContentWrapper,
  ItemList,
} from '#/components/Community/styles/common';
const CommunityPost = () => {
  return (
    <Container>
      <Banner src={banner} />
      <SearchBarContainer>
        <SearchBar />
      </SearchBarContainer>
      <ContentWrapper>
        <Header>
          <HeaderFilter />
          <HeaderFilter />
        </Header>
        <ItemList>
          {new Array(3).fill('').map((_, i) => (
            <ItemContainer />
          ))}
        </ItemList>
      </ContentWrapper>
    </Container>
  );
};
export default CommunityPost;
const Banner = styled.img`
  width: 100%;
  @media (max-width: 800px) {
    display: none;
  }
`;
const SearchBar = styled.div`
  width: 100%;
  height: 48px;
  border-radius: 5px;
  box-sizing: border-box;
  margin: 0 25px;
  margin-top: 30px;
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
  @media only screen and (min-width: 800px) {
    margin: 0 96px;
    margin-top: 30px;
  }
`;
const SearchBarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
export const Header = styled.div`
  display: flex;
  margin-left: 25px;
  gap: 8px;
  @media only screen and (min-width: 800px) {
    margin-left: 90px;
  }
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
const ItemContainer = styled.div`
  height: 132px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0 25px;
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
  @media only screen and (min-width: 800px) {
    padding: 0 96px;
  }
`;
