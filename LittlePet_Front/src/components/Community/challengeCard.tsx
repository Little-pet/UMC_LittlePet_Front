import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import profileIcon from '#/assets/기본 프로필.svg';
import { AnimalIcons } from '#/components/icon';
import ChallengerBadge from '@assets/챌린저.svg';
import LikeBadge from '@assets/소셜응원왕.svg';
import MasterWriterBadge from '@assets/글쓰기마스터.svg';
import CommentBadge from '@assets/소통천재.svg';
import PopularBadge from '@assets/인기스타.svg';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Badge {
  name: string;
}
interface Content {
  content: string;
  sequence: number;
}
interface ChallengeCardProps {
  name: string; // 유저 이름
  postId: number; // 게시물 ID
  animal: string; // 동물 이름
  descriptionTitle: string; // 설명 제목
  contents: Content[]; // 설명 내용
  category: string;
  type: string;
  userId: number;
}
const badgeIconMapping: { [key: string]: string } = {
  글쓰기마스터: MasterWriterBadge,
  소셜응원왕: LikeBadge,
  소통천재: CommentBadge,
  챌린저: ChallengerBadge,
  인기스타: PopularBadge,
};
const ChallengeCard: React.FC<ChallengeCardProps> = ({
  name,
  postId,
  animal,
  descriptionTitle,
  contents,
  category,
  type,
  userId,
}) => {
  const [profilePhoto, setProfilePhoto] = useState<string>();
  const [badges, setBadges] = useState<Badge[]>();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 800);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function isImageUrl(url: string): boolean {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  }
  const getFirstImageContent = (contents: Content[]) => {
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

  const { data, isLoading } = useQuery({
    queryKey: ['userInfoInChallengeCard', userId],
    queryFn: () =>
      userId
        ? axios
            .get(`https://umclittlepet.shop/api/users/${userId}`, {
              withCredentials: true,
            })
            .then((response) => response.data.result) // 데이터를 반환
        : Promise.resolve(null),
    enabled: !!userId,
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
  });
  useEffect(() => {
    if (!isLoading) {
      setProfilePhoto(data.profilePhoto);
      setBadges(data.userBadge);
    }
  }, [data]);
  if (!data || profilePhoto === undefined || badges === undefined)
    return <Skeleton />;

  return (
    <CardContainer
      to={`/community/${type}/${postId}`}
      state={{ category, type }}
      bgImage={imageContent ? imageContent.content : undefined}
    >
      <ContentWrapper>
        <ProfileWrapper>
          <ProfileImg
            src={profilePhoto === null ? profileIcon : profilePhoto}
          />
          <div>
            <UserName>{name}</UserName>

            <UserInfoWrapper>
              {badges?.slice(0, 1).map((badge, idx) => {
                const icon = badgeIconMapping[badge.name];
                if (!icon) return null;
                return <BadgeIcon key={idx} src={icon} alt={badge.name} />;
              })}
              <AnimalWrapper>
                <AnimalImg src={getAnimalIcon(animal)} />
                <AnimalText>{animal}</AnimalText>
              </AnimalWrapper>
            </UserInfoWrapper>
          </div>
        </ProfileWrapper>
        <DescriptionWrapper>
          {(() => {
            if (isMobile) {
              const truncated =
                descriptionTitle.length > 13
                  ? descriptionTitle.slice(0, 10) + '...'
                  : descriptionTitle;
              return <DescriptionTitle>{truncated}</DescriptionTitle>;
            } else {
              const truncated =
                descriptionTitle.length > 17
                  ? descriptionTitle.slice(0, 14) + '...'
                  : descriptionTitle;
              return <DescriptionTitle>{truncated}</DescriptionTitle>;
            }
          })()}

          {(() => {
            const nonImageContents = contents.filter(
              (item) => !isImageUrl(item.content)
            );
            if (nonImageContents.length > 0) {
              const firstItem = nonImageContents[0];
              if (isMobile) {
                const truncated =
                  firstItem.content.length > 17
                    ? firstItem.content.slice(0, 14) + '...'
                    : firstItem.content;
                return <DescriptionText>{truncated}</DescriptionText>;
              } else {
                const truncated =
                  firstItem.content.length > 25
                    ? firstItem.content.slice(0, 22) + '...'
                    : firstItem.content;
                return <DescriptionText>{truncated}</DescriptionText>;
              }
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
  z-index: 1;
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
  @media (min-width: 800px) {
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
  bottom: 7px;
  left: 18px;
  @media (min-width: 800px) {
    width: 342px;
    height: 142px;
    bottom: 0px;
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
  @media (min-width: 800px) {
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
  @media (min-width: 800px) {
    width: 26px;
    height: 26px;
  }
`;
const UserName = styled.div`
  font-size: 12px;
  font-family: 'Pretendard-SemiBold';
  line-height: 25px;
  color: #ffffff;
  @media (min-width: 800px) {
    font-size: 16px;
  }
`;

const AnimalText = styled.div`
  font-size: 10px;
  font-family: 'Pretendard-SemiBold';
  color: #ffffff;
  @media (min-width: 800px) {
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
  @media (min-width: 800px) {
    font-size: 24px;
    line-height: 35px;
  }
`;

const DescriptionText = styled.div`
  font-size: 12px;
  font-family: 'Pretendard-SemiBold';
  line-height: 21px;
  color: #ffffff;
  @media (min-width: 800px) {
    font-size: 16px;
    line-height: 35px;
  }
`;
const BadgeIcon = styled.img`
  height: 15px;
  width: auto;
  /* background-color: white;
  border-radius: 15px; */
`;
const Skeleton = styled.div`
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
