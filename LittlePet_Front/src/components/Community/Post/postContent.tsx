import React from 'react';
import BadgeComponent from '#/components/Community/Badge'; // 실제 컴포넌트 경로로 수정
import LikeButton from '#/components/Community/Post/LikeButton'; // 실제 컴포넌트 경로로 수정
import styled from 'styled-components';
import animalIcon from '#/assets/동물 아이콘.svg';
import vectorIcon from '#/assets/Vector.svg';
import femaleIcon from '#/assets/성별여자.svg';
import maleIcon from '#/assets/성별남자.svg';

interface PostContentProps {
  title: string;
  author: string;
  badgeType: 'challenge' | 'popular';
  animal: string;
  gender: string;
  date: string;
  time: string;
  footerData: string[];
  description: string;
  likeCount: number;
}
const PostContent: React.FC<PostContentProps> = ({
  title,
  author,
  badgeType,
  animal,
  gender,
  date,
  time,
  footerData,
  description,
  likeCount,
}) => {
  return (
    <ContentBox>
      <PostContentWrapper>
        <Title>{title}</Title>
        <InfoWrapper>
          <InfoSection>
            <Text>{author}</Text>
            <BadgeComponent type={badgeType} />
          </InfoSection>
          <InfoSection>
            <AnimalInfo>
              <img src={animalIcon} style={{ width: '18px', height: '18px' }} />
              <Text>{animal}</Text>
            </AnimalInfo>
            {gender == 'female' ? (
              <img src={femaleIcon} style={{ width: '9px' }} />
            ) : (
              <img src={maleIcon} style={{ width: '11px' }} />
            )}
          </InfoSection>
          <TimeText>
            {date}&nbsp;&nbsp;{time}
          </TimeText>
        </InfoWrapper>
        <Footer>
          {footerData.map((item, index) => (
            <FooterContainer key={index}>
              <FooterItem style={{ margin: '0' }}>
                {index === 0 ? '조회' : index === 1 ? '좋아요' : '댓글'}&nbsp;
              </FooterItem>
              <FooterItem
                style={{
                  color: index === 1 ? '#C76B6B' : index === 2 ? '#6EA8FE' : '',
                }}
              >
                {item}
              </FooterItem>
              {index !== 2 && <VectorIcon src={vectorIcon} />}
            </FooterContainer>
          ))}
        </Footer>

        <DescriptionText>{description}</DescriptionText>
      </PostContentWrapper>
      <LikeButton count={likeCount} />
    </ContentBox>
  );
};

export default PostContent;
const ContentBox = styled.div`
  padding: 0 25px;
  margin: 20px 0;
  margin-top: 30px;
  @media only screen and (min-width: 800px) {
    margin: 20px 96px;
    margin-top: 30px;
  }
`;
const PostContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const Title = styled.div`
  font-size: 20px;
  font-family: 'Pretendard-SemiBold';
  line-height: 22px;
`;
const InfoWrapper = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;
const InfoSection = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;
const TimeText = styled.div`
  font-size: 12px;
  font-family: Pretendard-Medium;
  color: #737373;
`;
const Footer = styled.div`
  height: 22px;
  display: flex;
  align-items: center;
  gap: 12px;
`;
const FooterContainer = styled.div`
  display: flex;
  align-items: center;
`;
const FooterItem = styled.div`
  font-size: 12px;
  font-family: 'Pretendard-Medium';
  margin-right: 12px;
  color: ##737373;
`;
const VectorIcon = styled.img`
  width: 1px;
  height: 10px;
`;
const AnimalInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;
const Text = styled.div`
  font-size: 14px;
  font-family: Pretendard-SemiBold;
`;
const DescriptionText = styled.div`
  margin-top: 10px;
  font-size: 12px;
  font-family: Pretendard-Medium;
  color: #262627cc;
  line-height: 18px;
`;
