import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import profileIcon from '#/assets/프로필.svg';
import BadgeComponent from '#/components/Community/Badge';
import { AnimalIcons } from '#/components/icon';
interface Badge {
  type: 'challenge' | 'popular'; // Badge type 제한
}
interface Content {
  content: string;
  sequence: number;
}
interface ChallengeCardProps {
  name: string; // 유저 이름
  postId: number; // 게시물 ID
  animal: string; // 동물 이름
  badges: Badge[]; // Badge 배열
  descriptionTitle: string; // 설명 제목
  contents: Content[]; // 설명 내용
  category: string;
  type: string;
}
const ChallengeCard: React.FC<ChallengeCardProps> = ({
  name,
  postId,
  animal,
  badges,
  descriptionTitle,
  contents,
  category,
  type,
}) => {
  function isImageUrl(url: string): boolean {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  }
  const getFirstImageContent = (contents) => {
    for (const item of contents) {
      if (isImageUrl(item.content)) {
        return item;
      }
    }
    return null;
  };
  const imageContent = getFirstImageContent(contents);
  const getAnimalIcon = (category: string) => {
    switch (category) {
      case '햄스터':
        return AnimalIcons.hamster;
      case '토끼':
        return AnimalIcons.rabbit;
      case '고슴도치':
        return AnimalIcons.hedgehog;
      case '페럿':
        return AnimalIcons.ferret;
      case '앵무새':
        return AnimalIcons.parrot;
      case '거북이':
        return AnimalIcons.turtle;
      case '뱀':
        return AnimalIcons.snake;
    }
  };
  return (
    <CardContainer
      to={`/community/${type}/${postId}`}
      state={{ category, type }}
      bgImage={imageContent ? imageContent.content : undefined}
    >
      <ContentWrapper>
        <ProfileWrapper>
          <ProfileImg src={profileIcon} />
          <div>
            <UserInfoWrapper>
              <UserName>{name}</UserName>
              <AnimalWrapper>
                <AnimalImg src={getAnimalIcon(animal)} />
                <AnimalText>{animal}</AnimalText>
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
          {(() => {
            const truncated =
              descriptionTitle.length > 15
                ? descriptionTitle.slice(0, 13) + '...'
                : descriptionTitle;
            return <DescriptionTitle>{truncated}</DescriptionTitle>;
          })()}

          {(() => {
            const nonImageContents = contents.filter(
              (item) => !isImageUrl(item.content)
            );
            if (nonImageContents.length > 0) {
              const firstItem = nonImageContents[0];
              const truncated =
                firstItem.content.length > 20
                  ? firstItem.content.slice(0, 18) + '...'
                  : firstItem.content;
              return <DescriptionText>{truncated}</DescriptionText>;
            }
            return null;
          })()}
        </DescriptionWrapper>
      </ContentWrapper>
    </CardContainer>
  );
};
export default ChallengeCard;
const CardContainer = styled(Link)<{ bgImage?: string }>`
  width: 200px;
  height: 240px;
  border-radius: 10px;
  background-color: #00000080;
  position: relative;
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center;
  z-index: -2;
  flex-shrink: 0; /* 카드가 축소되지 않도록 설정 */
  overflow: hidden;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5); /* 30% 까맣게, 필요에 따라 조정 */
    z-index: -1;
  }
  @media (min-width: 768px) {
    width: 400px;
    height: 480px;
  }
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
  @media (min-width: 768px) {
    width: 342px;
    height: 142px;
    top: 317px;
    left: 26px;
    gap: 8px;
  }
`;

const ProfileWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 20px;
  height: 20px;
  @media (min-width: 768px) {
    width: 50px;
    height: 50px;
  }
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

const AnimalImg = styled.img`
  width: 20px;
  height: 20px;
  @media (min-width: 768px) {
    width: 26px;
    height: 26px;
  }
`;
const UserName = styled.div`
  font-size: 12px;
  font-family: 'Pretendard-SemiBold';
  line-height: 35px;
  color: #ffffff;
  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

const AnimalText = styled.div`
  font-size: 10px;
  font-family: 'Pretendard-SemiBold';
  color: #ffffff;
  @media (min-width: 768px) {
    font-size: 14px;
  }
`;

const DescriptionWrapper = styled.div``;

const DescriptionTitle = styled.div`
  font-size: 16px;
  font-family: 'Pretendard-Bold';
  line-height: 28px;
  color: #ffffff;
  max-height: 28px;
  overflow: hidden;
  @media (min-width: 768px) {
    font-size: 24px;
    line-height: 35px;
  }
`;

const DescriptionText = styled.div`
  font-size: 12px;
  font-family: 'Pretendard-SemiBold';
  line-height: 21px;
  color: #ffffff;
  @media (min-width: 768px) {
    font-size: 16px;
    line-height: 35px;
  }
`;
