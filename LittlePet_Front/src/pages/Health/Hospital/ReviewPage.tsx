import styled from 'styled-components';
import penIcon from '#/assets/연필.svg';
import 고슴도치 from '#/assets/고슴도치.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ReviewItem from '#/components/Hospital/ReviewItem';
// 타입 정의
type FilterType = 'popular' | 'new';

const ReviewPage = () => {
  const [selected, setSelected] = useState<FilterType>('popular');

  const handleClick = (filter: FilterType) => {
    setSelected(filter);
  };
  return (
    <Container>
      <ContentWrapper>
        <Top>
          <TitleWrapper>
            <Title>리뷰</Title>
            <Count>118</Count>
          </TitleWrapper>
          <ReviewButton to={'/health/hospital/1/add'}>
            <img src={penIcon} style={{ width: '13px' }} />
            <ReviewButtonText>리뷰 쓰기</ReviewButtonText>
          </ReviewButton>
        </Top>
        <Header>
          <HeaderFilter
            onClick={() => handleClick('popular')}
            isActive={selected === 'popular'}
          >
            인기순
          </HeaderFilter>
          <HeaderFilter
            onClick={() => handleClick('new')}
            isActive={selected === 'new'}
          >
            최신순
          </HeaderFilter>
        </Header>
      </ContentWrapper>
      <ReviewList>
        <ReviewItem
          name='천혜향'
          rate='5.0'
          animal='토끼'
          gender='female'
          content='친절하게 진료 봐주시고 수술도 잘 마쳤습니다. 애용할 것 같아요. 우려했던 것에 비해 수술비는 얼마 안 나와서 다행이에요. 합리적인 가격에 친절한 진료를 받을 수 있어 좋은 것 같네요~~ ♥️♥️ 수술 마치고서도 이렇게 따뜻한 이불에서 푹 쉴 수 있도록 해주시고 ...'
          date='24.7.26 금'
          visit={1}
          imgs={[고슴도치, 고슴도치, 고슴도치]}
        />
        <ReviewItem
          name='천혜향'
          rate='5.0'
          animal='토끼'
          gender='female'
          content='친절하게 진료 봐주시고 수술도 잘 마쳤습니다. 애용할 것 같아요. 우려했던 것에 비해 수술비는 얼마 안 나와서 다행이에요. 합리적인 가격에 친절한 진료를 받을 수 있어 좋은 것 같네요~~ ♥️♥️ 수술 마치고서도 이렇게 따뜻한 이불에서 푹 쉴 수 있도록 해주시고 ...'
          date='24.7.26 금'
          visit={1}
        />
      </ReviewList>
    </Container>
  );
};
export default ReviewPage;
const Top = styled.div`
  display: flex;
  padding: 0 25px;
  justify-content: space-between;
  @media only screen and (min-width: 800px) {
    padding: 0 96px;
  }
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Container = styled.div`
  padding: 20px 0;
`;
const TitleWrapper = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;
const Title = styled.div`
  font-size: 18px;
  font-family: Pretendard-SemiBold;
  color: black;
`;
const Count = styled.div`
  font-size: 14px;
  font-family: Pretendard-SemiBold;
  color: #737373;
`;
const ReviewButton = styled(Link)`
  display: flex;
  gap: 5px;
  text-decoration: none;
`;
const Header = styled.ul`
  display: flex;
  margin: 0;
  margin-bottom: 25px;
  margin-top: 10px;
  @media only screen and (min-width: 800px) {
    margin: 10px 0;
    margin-left: 75px;
  }
`;
const ReviewButtonText = styled.div`
  font-size: 14px;
  font-family: 'Pretendard-Medium', sans-serif;
  color: #6ea8fe;
`;
const HeaderFilter = styled.li<{ isActive: boolean }>`
  width: 65px;
  display: list-item;
  font-size: 12px;
  font-family: 'Pretendard-SemiBold';
  cursor: pointer;
  color: ${({ isActive }) => (isActive ? '#6EA8FE' : '#262627')};
`;
const ReviewList = styled.div`
  padding: 0 25px;
`;
