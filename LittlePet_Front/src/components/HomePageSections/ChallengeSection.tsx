import React from 'react';
import styled from 'styled-components';

const ChallengeSection: React.FC = () => {
  return (
    <ChallengeContainer>
      <ChallengeTitle>금주의 챌린저👑</ChallengeTitle>
      <ChallengeSubTitle>
        “우리 동물들... 연예인 닮은 모먼트를 <br />
        찍어 공유하자!”
      </ChallengeSubTitle>
      <ChallengeBanner>
        <BannerText>
          <BannerTitle>이번 주 챌린지에 참여하세요!👑</BannerTitle>
          <BannerDescription>
            너... 동물 아니지, 사람이지! 했던 순간을 공유해요!
          </BannerDescription>
        </BannerText>
        {/* 버튼챌린지 페이지로 이동하는 링크 추가가 */}
        <BannerButton>챌린지 참여하기</BannerButton>
      </ChallengeBanner>
    </ChallengeContainer>
  );
};

export default ChallengeSection;

const ChallengeContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 30px;
`;

const ChallengeTitle = styled.h1`
  font-size: 26px;
  font-family: 'Pretendard';
  font-weight: 700;
  line-height: 35px;
  margin: 0;
  padding-right: 25px;
`;

const ChallengeSubTitle = styled.h2`
  font-size: 20px;
  font-family: 'Pretendard';
  font-weight: 600;
  line-height: 32px;
  margin: 0;
  padding-right: 25px;
`;

const ChallengeBanner = styled.div`
  box-sizing: border-box;
  background: #6ea8fe1a;
  border-radius: 10px;
  width: 343px;
  height: 117px;
  padding: 16px;
  gap: 10px;
`;

const BannerText = styled.div`
  width: 236px;
  height: 41px;
  padding-top: 8px;
  padding-left: 8px;
`;

const BannerTitle = styled.h1`
  font-weight: 700;
  font-size: 16px;
  line-height: 25px;
  margin: 0;
`;

const BannerDescription = styled.p`
  font-weight: 600;
  font-size: 10px;
  line-height: 16px;
  color: #737373;
  margin: 0;
`;

const BannerButton = styled.button`
  background: #6ea8fe;
  border-radius: 50px;
  width: 115px;
  height: 30px;
  padding: 0;
  gap: 10px;
  color: #ffffff;
  font-weight: 500;
  font-size: 12px;
  font-family: 'Pretendard';
  border: none;
  box-shadow: 0px 4px 5px #00000026;
  margin-left: 197px;
  margin-top: 8px;
`;
