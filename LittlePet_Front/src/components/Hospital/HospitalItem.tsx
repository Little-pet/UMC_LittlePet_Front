import React from 'react';
import styled from 'styled-components';
import FavoriteButton from '#/components/Hospital/Favorites';
import starIcon from '#/assets/star.svg';
import commentIcon from '#/assets/댓글.svg';
import { Link } from 'react-router-dom';

interface HospitalItemProps {
  imageSrc: string;
  name: string;
  hospitalId: string | number;
  distance: number;
  rating: number;
  comments: number;
  openStatus: string;
}
const HospitalItem: React.FC<HospitalItemProps> = ({
  imageSrc,
  name,
  hospitalId,
  distance,
  rating,
  comments,
  openStatus,
}) => {
  return (
    <Container>
      <ContentWrapper to={`/health/hospital/${hospitalId}`}>
        <Image src={imageSrc} alt='Hospital' />
        <Details>
          <Header>
            <HospitalName>{name}</HospitalName>
            <Distance>{distance}m</Distance>
          </Header>
          <RatingsWrapper>
            <Rating>
              <StarIcon src={starIcon} alt='Star' />
              <RatingText>{rating}</RatingText>
            </Rating>
            <Comments>
              <CommentIcon src={commentIcon} alt='Comments' />
              <CommentText>{comments}</CommentText>
            </Comments>
          </RatingsWrapper>
          <OpenStatus>{openStatus}</OpenStatus>
        </Details>
      </ContentWrapper>
      <FavoriteButton />
    </Container>
  );
};

export default HospitalItem;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px;
  border-bottom: 1px solid #e6e6e6;
  cursor: pointer;
  @media only screen and (min-width: 800px) {
    padding: 20px 96px;
  }
`;

const ContentWrapper = styled(Link)`
  display: flex;
  gap: 15px;
  text-decoration: none;
`;

const Image = styled.img`
  width: 60px; /* 적절한 크기 설정 */
  height: 60px; /* 적절한 크기 설정 */
  border-radius: 8px;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Header = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const HospitalName = styled.div`
  font-size: 18px;
  font-family: Pretendard-SemiBold;
  color: black;
`;

const Distance = styled.div`
  font-size: 12px;
  font-family: Pretendard-Medium;
  color: #737373;
`;

const RatingsWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const Rating = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

const Comments = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

const CommentIcon = styled.img`
  height: 20px;
`;

const StarIcon = styled.img``;

const RatingText = styled.div`
  font-size: 12px;
  font-family: Pretendard-Medium;
  color: #737373;
`;

const CommentText = styled.div`
  font-size: 12px;
  font-family: Pretendard-Medium;
  color: #737373;
`;

const OpenStatus = styled.div`
  font-size: 12px;
  font-family: Pretendard-Medium;
  color: #6ea8fe;
`;
