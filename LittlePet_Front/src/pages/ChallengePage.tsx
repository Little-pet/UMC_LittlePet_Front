import ChallengeCard from '#/components/Community/challengeCard';
import ChallengeItem from '#/components/Community/challengeItem';
import styled from 'styled-components';
import MobileAddButton from '#/components/Community/AddButton/MobileAddButton';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import banner from '#/assets/banner/챌린지 배너.svg';
const ChallengePage: React.FC = () => {
  const [selected, setSelected] = useState<'popular' | 'new'>('popular');
  const navigate = useNavigate();

  const handleNavigate = (): void => {
    navigate('/community/add');
  };
  const handleClick = (filter: 'popular' | 'new') => {
    setSelected(filter);
  };
  return (
    <Container>
      <Banner src={banner} />
      <ContentWrapper style={{ marginTop: '30px' }}>
        <HeaderWrapper>
          <Title>금주의 챌린저 👑</Title>
          <Subtitle>
            “우리 동물들... 연예인 닮은 모먼트를 찍어 공유하자!”
          </Subtitle>
        </HeaderWrapper>
        <ChallengeWrapper>
          <ChallengeCard
            name='천혜향'
            postId={9}
            animal='햄스터'
            gender='male'
            badges={[{ type: 'challenge' }, { type: 'popular' }]}
            descriptionTitle='조규현 닮은 푸들 아니고...'
            descriptionText='이쯤되면 동물들이 규현을 닮은 게...'
          />
          <ChallengeCard
            name='천혜향'
            postId={9}
            animal='햄스터'
            gender='male'
            badges={[{ type: 'challenge' }, { type: 'popular' }]}
            descriptionTitle='조규현 닮은 푸들 아니고...'
            descriptionText='이쯤되면 동물들이 규현을 닮은 게...'
          />
          <ChallengeCard
            name='천혜향'
            postId={9}
            animal='햄스터'
            gender='male'
            badges={[{ type: 'challenge' }, { type: 'popular' }]}
            descriptionTitle='조규현 닮은 푸들 아니고...'
            descriptionText='이쯤되면 동물들이 규현을 닮은 게...'
          />
        </ChallengeWrapper>
      </ContentWrapper>
      <BannerContainer>
        <BannerTextContainer>
          <Title>이번 주 챌린지에 참여하세요! 👑</Title>
          <Subtitle style={{ fontSize: '18px', color: '#737373' }}>
            너... 동물 아니지, 사람이지! 했던 순간을 공유해요!
          </Subtitle>
        </BannerTextContainer>
        <BannerButton onClick={handleNavigate}>챌린지 참여하기</BannerButton>
      </BannerContainer>
      <ContentWrapper>
        <HeaderWrapper>
          <Title>이번 주 챌린지 🔥</Title>
          <Subtitle>
            “너... 동물 아니지, 사람이지! 했던 순간을 공유해요!”
          </Subtitle>
        </HeaderWrapper>
        <Header>
          <HeaderFilter
            onClick={() => handleClick('popular')}
            isActive={selected === 'popular'}
          >
            인기순
          </HeaderFilter>
          <HeaderFilter
            onClick={() => handleClick('new')}
            isActive={selected === 'new'}
          >
            최신순
          </HeaderFilter>
        </Header>
        <ItemList>
          <ChallengeItem
            title='나갈래 고양이의 뒤를 잇는 나갈래 토끼...'
            name='천혜향'
            postId={9}
            views={294}
            likes={190}
            comments={32}
          />
          <ChallengeItem
            title='나갈래 고양이의 뒤를 잇는 나갈래 토끼...'
            name='천혜향'
            postId={9}
            views={294}
            likes={190}
            comments={32}
          />
          <ChallengeItem
            title='나갈래 고양이의 뒤를 잇는 나갈래 토끼...'
            name='천혜향'
            postId={9}
            views={294}
            likes={190}
            comments={32}
          />
          <ChallengeItem
            title='나갈래 고양이의 뒤를 잇는 나갈래 토끼...'
            name='천혜향'
            postId={9}
            views={294}
            likes={190}
            comments={32}
          />
        </ItemList>
      </ContentWrapper>
      <MobileAddButton />
    </Container>
  );
};
export default ChallengePage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const BannerContainer = styled.div`
  background-color: #6ea8fe1a;
  margin: 0 96px;
  padding: 50px;
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  @media (max-width: 800px) {
    display: none;
  }
`;
const BannerTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const BannerButton = styled.button`
  width: 255px;
  padding: 11px 80px;
  border: none;
  background-color: #6ea8fe;
  color: #ffffff;
  font-family: 'Pretendard-SemiBold';
  font-size: 15px;
  border-radius: 50px;
  cursor: pointer;
  margin-top: 10px;
  align-self: flex-end;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.13);
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

const Title = styled.div`
  font-size: 26px;
  font-family: 'Pretendard-Bold';
`;

const Subtitle = styled.div`
  font-size: 20px;
  font-family: 'Pretendard-SemiBold';
  line-height: 32px;
`;

const ChallengeWrapper = styled.div`
  display: flex;
  gap: 10px;
  padding-left: 25px;
  overflow-x: auto; /* 가로 스크롤 */
  overflow-y: hidden; /* 세로 스크롤 방지 */
  /* 크롬, 사파리, 오페라, 엣지에서 스크롤바 숨기기 */
  ::-webkit-scrollbar {
    display: none;
  }

  /* 인터넷 익스플로러에서 스크롤바 숨기기 */
  -ms-overflow-style: none; 

  /* 파이어폭스에서 스크롤바 숨기기 */
  scrollbar-width: none; 
   @media only screen and (min-width: 800px) {
    padding-left: 96px;
  }
}
`;
const Header = styled.ul`
  display: flex;
  margin: 0;
  @media only screen and (min-width: 800px) {
    margin: 10px 0;
    margin-left: 75px;
  }
`;

const HeaderFilter = styled.li<{ isActive: boolean }>`
  width: 65px;
  display: list-item;
  font-size: 12px;
  font-family: 'Pretendard-SemiBold';
  cursor: pointer;
  color: ${({ isActive }) => (isActive ? '#6EA8FE' : '#262627')};
  @media only screen and (min-width: 800px) {
    font-size: 16px;
    width: 75px;
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
const Banner = styled.img`
  width: 100%;
  @media (max-width: 800px) {
    display: none;
  }
`;
