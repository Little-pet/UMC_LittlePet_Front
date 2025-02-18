import styled from 'styled-components';
import { FC, useState } from 'react';
import cancleIcon from '#/assets/취소.svg';
import checkIcon from '#/assets/체크표시.svg';
import currentIcon from '#/assets/현재 위치 아이콘.svg';
import { motion } from 'framer-motion';
interface AreaModalProps {
  onClose: () => void;
  onSelect: (area: string, code: number) => void;
  area: string;
}
const AreaModal: FC<AreaModalProps> = ({ onClose, onSelect, area }) => {
  const seoulDistricts = [
    { name: '강남구', code: 23 },
    { name: '강동구', code: 25 },
    { name: '강북구', code: 9 },
    { name: '강서구', code: 16 },
    { name: '관악구', code: 21 },
    { name: '광진구', code: 5 },
    { name: '구로구', code: 17 },
    { name: '금천구', code: 18 },
    { name: '노원구', code: 11 },
    { name: '도봉구', code: 10 },
    { name: '동대문구', code: 6 },
    { name: '동작구', code: 20 },
    { name: '마포구', code: 14 },
    { name: '서대문구', code: 13 },
    { name: '서초구', code: 22 },
    { name: '성동구', code: 4 },
    { name: '성북구', code: 8 },
    { name: '송파구', code: 24 },
    { name: '양천구', code: 15 },
    { name: '영등포구', code: 19 },
    { name: '용산구', code: 3 },
    { name: '은평구', code: 12 },
    { name: '종로구', code: 1 },
    { name: '중구', code: 2 },
    { name: '중랑구', code: 7 },
  ];

  // 선택된 지역 상태 관리
  const [selectedArea, setSelectedArea] = useState<string | null>(area);

  const handleSelect = (area: string, code: number) => {
    setSelectedArea(area); // 선택된 지역 업데이트
    onSelect(area, code);
    onClose();
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('User Location:', latitude, longitude);
          setSelectedArea('서초구'); // 선택된 지역 업데이트
          onSelect('서초구', 22);
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
              isSelected={selectedArea === area.name}
              onClick={() => handleSelect(area.name, area.code)}
            >
              {area.name}{' '}
              {selectedArea === area.name && <img src={checkIcon} />}
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
