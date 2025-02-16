import { useParams, useLocation } from 'react-router-dom';
import { Outlet, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import starIcon from '#/assets/star.svg';
import FavoriteButton from '#/components/Hospital/Favorites';
import commentIcon from '#/assets/댓글.svg';
import hospitalImg from '#/assets/image 35.png';
import { useHospitalStore } from '#/context/hospitalStore';
// 타입 정의
interface Category {
  type: string;
  title: string;
  path: string;
}
const HospitalDetailPage = () => {
  const { hospitalId } = useParams<{ hospitalId: string }>();
  const location = useLocation();
  const categories: Category[] = [
    {
      type: 'info',
      title: '병원 정보',
      path: `/health/hospital/${hospitalId}/info`,
    },
    {
      type: 'review',
      title: '리뷰',
      path: `/health/hospital/${hospitalId}/review`,
    },
    {
      type: 'location',
      title: '위치',
      path: `/health/hospital/${hospitalId}/location`,
    },
  ];
  const [selected, setSelected] = useState<string>(
    localStorage.getItem('hospitalCategory') || 'info'
  );
  const handleClick = (type: string) => {
    setSelected(type);
    localStorage.setItem('hospitalCategory', type);
  };
  useEffect(() => {
    if (location.pathname === `/health/hospital/${hospitalId}`) {
      // ✅ `/health` 진입 시 기본값 `record` 설정
      setSelected('info');
      localStorage.setItem('hospitalCategory', 'info');
    }
  }, [location.pathname]);

  const { hospitalDetail, fetchHospitalDetail, scrappedHospitals } =
    useHospitalStore();

  useEffect(() => {
    fetchHospitalDetail(hospitalId);
  }, [hospitalId, fetchHospitalDetail]);
  if (!hospitalDetail) return <div>Loading...</div>;
  const isFavorited = scrappedHospitals.some(
    (hospital) => hospital.name === hospitalDetail.name
  );
  return (
    <div>
      <Img src={hospitalDetail.imageUrl} />
      <DetailBox>
        <Details>
          <Header>
            <HospitalName>{hospitalDetail.name}</HospitalName>
          </Header>
          <OpenStatus>{hospitalDetail.address}</OpenStatus>
          <RatingsWrapper>
            <Rating>
              <StarIcon src={starIcon} alt='Star' />
              <RatingText>4.0</RatingText>
            </Rating>
            <Comments>
              <CommentIcon src={commentIcon} alt='Comments' />
              <CommentText>0</CommentText>
            </Comments>
          </RatingsWrapper>
        </Details>
        <FavoriteButton isSelected={isFavorited} hospitalId={hospitalId} />
      </DetailBox>
      <ItemHeader>
        <ItemContainer>
          {categories.map((category, index) => (
            <MenuItem
              key={index}
              to={category.path}
              onClick={() => handleClick(category.type)}
              isActive={selected === category.type}
              state={{ info: hospitalDetail }}
            >
              {category.title}
            </MenuItem>
          ))}
        </ItemContainer>
      </ItemHeader>
      <Outlet />
    </div>
  );
};
export default HospitalDetailPage;
const Img = styled.img`
  padding: 0 25px;
  width: 100%;
  box-sizing: border-box;
  margin-top: 25px;
  @media only screen and (min-width: 800px) {
    padding: 20px 96px;
  }
`;
const DetailBox = styled.div`
  padding: 20px 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 18px;
  border-bottom: 1px solid #e6e6e6;
  @media only screen and (min-width: 800px) {
    padding: 20px 96px;
  }
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
const ItemHeader = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 42px;
  padding: 0 25px;
  border-bottom: 0.5px solid #d9d9d9;
  box-sizing: border-box;
`;
const ItemContainer = styled.div`
  display: flex;
  gap: 50px;
`;
const MenuItem = styled(Link)<{ isActive: boolean }>`
  font-family: Pretendard-Medium;
  line-height: 42px;
  font-size: 14px;
  text-decoration: none;
  color: ${({ isActive }) => (isActive ? '#6EA8FE' : 'black')};
`;
