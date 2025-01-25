import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import profileIcon from '#/assets/프로필.svg';
import animalIcon from '#/assets/동물 아이콘.svg';
import femaleIcon from '#/assets/성별여자.svg';
import maleIcon from '#/assets/성별남자.svg';
import BadgeComponent from '#/components/Community/Badge';

interface Badge {
  type: 'challenge' | 'popular'; // Badge type 제한
}

interface ChallengeCardProps {
  name: string; // 유저 이름
  postId: number; // 게시물 ID
  animal: string; // 동물 이름
  gender: 'male' | 'female'; // 성별
  badges: Badge[]; // Badge 배열
  descriptionTitle: string; // 설명 제목
  descriptionText: string; // 설명 내용
}
const ChallengeCard: React.FC<ChallengeCardProps> = ({
  name,
  postId,
  animal,
  gender,
  badges,
  descriptionTitle,
  descriptionText,
}) => {
  return (
    <CardContainer to={`/community/${postId}`}>
      <ContentWrapper>
        <ProfileWrapper>
          <img src={profileIcon} style={{ width: '20px', height: '20px' }} />
          <div>
            <UserInfoWrapper>
              <UserName>{name}</UserName>
              <AnimalWrapper>
                <img
                  src={animalIcon}
                  style={{ width: '16px', height: '16px' }}
                />
                <AnimalText>{animal}</AnimalText>
                {gender == 'female' ? (
                  <img src={femaleIcon} style={{ width: '6px' }} />
                ) : (
                  <img src={maleIcon} style={{ width: '8px' }} />
                )}
              </AnimalWrapper>
            </UserInfoWrapper>
            <div style={{ display: 'flex', gap: '4px' }}>
              {badges.map((badge, index) => (
                <BadgeComponent key={index} type={badge.type} />
              ))}
            </div>
          </div>
        </ProfileWrapper>
        <DescriptionWrapper>
          <DescriptionTitle>{descriptionTitle}</DescriptionTitle>
          <DescriptionText>{descriptionText}</DescriptionText>
        </DescriptionWrapper>
      </ContentWrapper>
    </CardContainer>
  );
};
export default ChallengeCard;
const CardContainer = styled(Link)`
  width: 200px;
  height: 240px;
  border-radius: 10px;
  background-color: #00000080;
  position: relative;
  flex-shrink: 0; /* 카드가 축소되지 않도록 설정 */
`;

const ContentWrapper = styled.div`
  width: 163px;
  height: 103px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: absolute;
  top: 120px;
  left: 18px;
`;

const ProfileWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const UserInfoWrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const AnimalWrapper = styled.div`
  display: flex;
  gap: 3px;
  align-items: center;
`;

const UserName = styled.div`
  font-size: 12px;
  font-family: 'Pretendard-SemiBold';
  line-height: 35px;
  color: #ffffff;
`;

const AnimalText = styled.div`
  font-size: 10px;
  font-family: 'Pretendard-SemiBold';
  color: #ffffff;
`;

const DescriptionWrapper = styled.div``;

const DescriptionTitle = styled.div`
  font-size: 16px;
  font-family: 'Pretendard-Bold';
  line-height: 28px;
  color: #ffffff;
`;

const DescriptionText = styled.div`
  font-size: 12px;
  font-family: 'Pretendard-SemiBold';
  line-height: 21px;
  color: #ffffff;
`;
