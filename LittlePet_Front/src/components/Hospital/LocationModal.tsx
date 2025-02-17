import React from 'react';
import closeIcon from '#/assets/close.svg';
import { motion } from 'framer-motion';
import styled from 'styled-components';
// Props 타입 정의
interface Info {
  id: number;
  name: string;
  address: string;
  closedDay: string;
  latitude?: number;
  longitude?: number;
  imageUrl: string;
  openingHours: string;
  phoneNumber: string;
  rating: number;
}
interface LocationModalProps {
  onClose: () => void; // 모달 닫기 콜백 함수
  info: Info;
}
const LocationModal: React.FC<LocationModalProps> = ({ onClose, info }) => {
  const openKakaoMap = (name: string, la: number, lo: number): void => {
    const kakaoUrl = `https://map.kakao.com/link/to/${name},${la},${lo}`;
    // 카카오맵 앱 열기
    window.open(kakaoUrl, '_blank', 'noopener,noreferrer');
  };
  return (
    <Container
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
    >
      <Header>
        <Title>병원위치</Title>
        <CloseIcon src={closeIcon} onClick={onClose} />
      </Header>
      <ContentContainer>
        <LocationHeader>
          <LocationName>{info.name}</LocationName>
        </LocationHeader>
        <Address>{info.address}</Address>
      </ContentContainer>
      <RouteButton
        onClick={() => openKakaoMap(info.name, info.latitude, info.longitude)}
      >
        길찾기
      </RouteButton>
    </Container>
  );
};
export default LocationModal;
const Container = styled(motion.div)`
  width: 100%;
  height: 232px;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  box-sizing: border-box;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  gap: 25px;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: white;
  z-index: 10;
`;
const Header = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  padding: 0 40px;
`;

const Title = styled.div`
  font-size: 22px;
  font-family: 'Pretendard-SemiBold';
`;

const CloseIcon = styled.img`
  position: absolute;
  right: 40px;
  cursor: pointer;
`;

const ContentContainer = styled.div`
  padding: 0 40px;
`;

const LocationHeader = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const LocationName = styled.div`
  font-size: 18px;
  font-family: 'Pretendard-SemiBold';
`;

const Address = styled.div`
  font-size: 12px;
  font-family: 'Pretendard-Medium';
  color: #737373;
  margin-top: 10px;
`;

const RouteButton = styled.div`
  border: 1px solid #6ea8fe;
  color: #6ea8fe;
  padding: 15px 0;
  margin: 0 40px;
  border-radius: 5px;
  font-size: 18px;
  font-family: 'Pretendard-Medium';
  text-align: center;
  cursor: pointer;
`;
