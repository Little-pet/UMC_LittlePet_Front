import React from 'react';
import styled from 'styled-components';
import animalIcon from '#/assets/동물 아이콘.svg';
import vectorIcon from '#/assets/Vector.svg';
import starIcon from '#/assets/star.svg';
interface ReviewItemProps {
  name: string;
  rate: string | number;
  animal: string;
  imgs?: string[];
  content: string;
  date: string | number;
  visit: string | number;
}
const ReviewItem: React.FC<ReviewItemProps> = ({
  name,
  rate,
  animal,
  imgs,
  content,
  date,
  visit,
}) => {
  return (
    <Container>
      <Header>
        <UserName>{name}</UserName>
        <RatingContainer>
          <img src={starIcon} style={{ width: '15px' }} />
          <RatingText>{rate}</RatingText>
        </RatingContainer>
        <UserInfo>
          <IconGroup>
            <img src={animalIcon} style={{ width: '14px', height: '14px' }} />
            <IconText>{animal}</IconText>
          </IconGroup>
        </UserInfo>
      </Header>
      {imgs ? (
        <ImgWrapper>
          {imgs?.map((img, idx) => (
            <img
              src={img}
              key={idx}
              style={{ width: '150px', height: '150px' }}
            />
          ))}
        </ImgWrapper>
      ) : null}

      <Content>{content}</Content>
      <Footer>
        <FooterItem>{date}</FooterItem>
        <VectorIcon src={vectorIcon} />
        <FooterItem>{visit}번째 방문</FooterItem>
        <VectorIcon src={vectorIcon} />
      </Footer>
    </Container>
  );
};
export default ReviewItem;
const ImgWrapper = styled.div`
  height: 150px;
  display: flex;
  gap: 5px;
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
`;
const Container = styled.div`
  padding: 25px 0;
  border-top: 1px solid #e6e6e6;
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media only screen and (min-width: 800px) {
    padding: 25px 96px;
  }
`;
const Footer = styled.div`
  height: 22px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FooterItem = styled.div`
  font-size: 10px;
  font-family: 'Pretendard-Medium';
  color: #333333;
`;

const VectorIcon = styled.img`
  height: 10px;
`;
const Content = styled.div`
  font-size: 10px;
  font-family: 'Pretendard-Medium';
  line-height: 18px;
  box-sizing: border-box;
  color: #262627cc;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const UserName = styled.div`
  font-size: 12px;
  font-family: Pretendard-SemiBold;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const IconGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const IconText = styled.div`
  font-size: 10px;
  font-family: Pretendard-Medium;
`;
const RatingText = styled.div`
  font-size: 12px;
  color: #737373;
`;
const RatingContainer = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;
