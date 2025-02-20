import React from 'react';
import styled from 'styled-components';
import FavoriteButton from '#/components/Hospital/Favorites';
import starIcon from '#/assets/star.svg';
import commentIcon from '#/assets/댓글.svg';
import { useAuthStore } from '#/store/AuthStore';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useHospitalStore } from '#/store/hospitalStore';
interface HospitalItemProps {
  imageSrc: string;
  name: string;
  hospitalId: string | number;
  comments: number;
  openStatus: string;
  rating: number;
}
const HospitalItem: React.FC<HospitalItemProps> = ({
  imageSrc,
  name,
  hospitalId,
  comments,
  openStatus,
  rating,
}) => {
  const { userId, isLoggedIn } = useAuthStore();
  const { fetchScrappedHospitals } = useHospitalStore();
  const { data, isLoading } = useQuery({
    queryKey: ['scrappedHospital', userId],
    queryFn: () =>
      userId ? fetchScrappedHospitals(userId) : Promise.resolve(null),
    enabled: !!userId && !!hospitalId && !!isLoggedIn,
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
  });

  if (isLoading) return <Skeleton />;
  const isFavorited = data.some((hospital) => hospital.name === name);
  return (
    <Container>
      <ContentWrapper to={`/health/hospital/${hospitalId}`}>
        <Image src={imageSrc} alt='Hospital' />
        <Details>
          <Header>
            <HospitalName>{name}</HospitalName>
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
      <FavoriteButton isSelected={isFavorited} hospitalId={hospitalId} />
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
  object-fit: cover;
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
  color: #737373;
`;
const Skeleton = styled.div`
  width: 95%;
  justify-self: center;
  height: 110px;
  margin-bottom: 5px;
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
