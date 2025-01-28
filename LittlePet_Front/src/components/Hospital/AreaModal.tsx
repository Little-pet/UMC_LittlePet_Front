import styled from 'styled-components';
import { FC, useState } from 'react';
import cancleIcon from '#/assets/취소.svg';
import checkIcon from '#/assets/체크표시.svg';
import currentIcon from '#/assets/현재 위치 아이콘.svg';
import { motion } from 'framer-motion';
interface AreaModalProps {
  onClose: () => void;
  onSelect: (area: string) => void;
}
const AreaModal: FC<AreaModalProps> = ({ onClose, onSelect }) => {
  const seoulDistricts = [
    '강남구',
    '강동구',
    '강북구',
    '강서구',
    '관악구',
    '광진구',
    '구로구',
    '금천구',
    '노원구',
    '도봉구',
    '동대문구',
    '동작구',
    '마포구',
    '서대문구',
    '서초구',
    '성동구',
    '성북구',
    '송파구',
    '양천구',
    '영등포구',
    '용산구',
    '은평구',
    '종로구',
    '중구',
    '중랑구',
  ];
  // 선택된 지역 상태 관리
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const handleSelect = (area: string) => {
    setSelectedArea(area); // 선택된 지역 업데이트
    onSelect(area);
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('User Location:', latitude, longitude);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('위치를 가져오는 데 실패했습니다.');
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      alert('브라우저가 위치 정보를 지원하지 않습니다.');
    }
  };
  return (
    <Container
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
    >
      <Header>
        <HeaderText>지역 선택</HeaderText>
        <CloseButton onClick={onClose}>
          <img src={cancleIcon} />
        </CloseButton>
      </Header>
      <Content>
        <FixedItem>서울시</FixedItem>
        <ItemList>
          {seoulDistricts.map((area, idx) => (
            <Item
              key={idx}
              isSelected={selectedArea === area}
              onClick={() => handleSelect(area)}
            >
              {area} {selectedArea === area && <img src={checkIcon} />}
            </Item>
          ))}
        </ItemList>
      </Content>
      <Footer>
        <CurrentLocation onClick={handleCurrentLocation}>
          <img src={currentIcon} />
          <CurrentLocationText>현재 위치</CurrentLocationText>
        </CurrentLocation>
      </Footer>
    </Container>
  );
};

export default AreaModal;
const Container = styled(motion.div)`
  border-radius: 50px 50px 0 0;
  position: absolute;
  background-color: white;
  height: 570px;
  width: 100%;
  bottom: 0px;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: 30px 0;
  box-sizing: border-box;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 40px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  position: absolute;
`;

const HeaderText = styled.div`
  flex: 1;
  text-align: center;
  font-size: 22px;
  font-family: Pretendard-SemiBold;
`;
const Content = styled.div`
  height: 80%;
  display: flex;
  border-top: 1px solid #e6e6e6;
  margin-top: 25px;
`;
const FixedItem = styled.div`
  font-size: 18px;
  font-family: Pretendard-Medium;
  padding: 13px 16px;
  background-color: #e6e6e644;
  flex-grow: 1;
  height: 44px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Item = styled.div<{ isSelected: boolean }>`
  cursor: pointer;
  border-bottom: 1px solid #e6e6e6;
  border-left: 1px solid #e6e6e6;
  font-size: 18px;
  font-family: Pretendard-Medium;
  padding: 13px 40px;
  height: 44px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${(props) => (props.isSelected ? '#6EA8FE' : '#333')};
`;
const ItemList = styled.div`
  flex-grow: 2;
  overflow-y: auto;
  height: 100%;
  ::-webkit-scrollbar {
    display: none;
  }
  /* 크롬, 사파리, 오페라, 엣지에서 스크롤바 숨기기 */
  ::-webkit-scrollbar {
    display: none;
  }

  /* 인터넷 익스플로러에서 스크롤바 숨기기 */
  -ms-overflow-style: none;

  /* 파이어폭스에서 스크롤바 숨기기 */
  scrollbar-width: none;
`;
const Footer = styled.div`
  padding: 10px 20px;
  box-shadow: 0px -5px 20px #0000000d;
`;

const CurrentLocation = styled.div`
  display: flex;
  gap: 10px;
  border: 1px solid #e6e6e6;
  padding: 15px 0;
  justify-content: center;
  border-radius: 5px;
  cursor: pointer;
`;

const CurrentLocationText = styled.div`
  font-size: 18px;
  font-family: 'Pretendard-Medium';
`;
