import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ChallengeCard from '#/components/Community/challengeCard';

const ChallengeSection: React.FC = () => {
  const navigate = useNavigate();
  const handleNavigate = (): void => {
    navigate('/community/add');
  };
  return (
    <ChallengeContainer>
      <ChallengeTitle>금주의 챌린저👑</ChallengeTitle>
      <ChallengeSubTitle>
        “우리 동물들... 연예인 닮은 모먼트를 찍어 공유하자!”
      </ChallengeSubTitle>

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

      <ChallengeBanner>
        <BannerText>
          <BannerTitle>이번 주 챌린지에 참여하세요!👑</BannerTitle>
          <BannerDescription>
            너... 동물 아니지, 사람이지! 했던 순간을 공유해요!
          </BannerDescription>
        </BannerText>
        {/* 버튼챌린지 페이지로 이동하는 링크 추가가 */}
        <BannerButton onClick={handleNavigate}>챌린지 참여하기</BannerButton>
      </ChallengeBanner>
    </ChallengeContainer>
  );
};

export default ChallengeSection;

const ChallengeContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 30px;
  padding-left: 25px;
  padding-right: 25px;
  @media (min-width: 768px) {
    padding: 0 96px;
    gap: 25px;
  }
`;

const ChallengeTitle = styled.h1`
  font-size: 26px;
  font-family: 'Pretendard';
  font-weight: 700;
  line-height: 35px;
  margin: 0;
  padding-right: 25px;
  @media (min-width: 768px) {
    font-size: 36px;
  }
`;

const ChallengeSubTitle = styled.h2`
  font-size: 20px;
  font-family: 'Pretendard';
  font-weight: 600;
  line-height: 32px;
  margin: 0;
  padding-right: 25px;
  @media (min-width: 768px) {
    font-size: 28px;
  }
`;

const ChallengeWrapper = styled.div`
  display: flex;
  gap: 10px;
  
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
  
    gap:25px;
  }
}
`;
const ChallengeBanner = styled.div`
  box-sizing: border-box;
  background: #6ea8fe1a;
  border-radius: 10px;
  height: 117px;
  padding: 16px;
  gap: 10px;
  position: relative;
  @media (min-width: 768px) {
    height: 270px;
    padding: 80px;
  }
`;

const BannerText = styled.div`
  height: 41px;
  padding-top: 8px;
  padding-left: 8px;
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    height: 101px;
    gap: 31px;
  }
`;

const BannerTitle = styled.h1`
  font-weight: 700;
  font-size: 16px;
  line-height: 25px;
  margin: 0;
  @media (min-width: 768px) {
    font-size: 36px;
    line-height: 35px;
  }
`;

const BannerDescription = styled.p`
  font-weight: 600;
  font-size: 10px;
  line-height: 16px;
  color: #737373;
  margin: 0;
  @media (min-width: 768px) {
    font-size: 28px;
    line-height: 35px;
  }
`;

const BannerButton = styled.button`
  background: #6ea8fe;
  border-radius: 50px;
  width: 115px;
  padding: 10px 18px;
  gap: 10px;
  color: #ffffff;
  font-weight: 500;
  font-size: 12px;
  font-family: 'Pretendard';
  border: none;
  box-shadow: 0px 4px 5px #00000026;
  position: absolute;
  right: 15px;
  cursor: pointer;
  @media (min-width: 800px) {
    width: 255px;
    padding: 11px 80px;
    font-size: 15px;
  }
`;
