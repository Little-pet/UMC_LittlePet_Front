import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import backIcon from '#/assets/뒤로가기.svg';
import LocationModal from '#/components/Hospital/LocationModal';
const { kakao } = window as any;

const LocationPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true); // 모달 표시 여부
  const navigate = useNavigate();
  const { state } = useLocation();
  const info = state?.info;
  const onClickBtn = () => {
    navigate(-1); // 바로 이전 페이지로 이동
  };

  useEffect(() => {
    const mapContainer = document.getElementById('map');
    const offsetY = 0.001;
    const position = new kakao.maps.LatLng(
      info.latitude - offsetY,
      info.longitude
    );
    const options = {
      center: position, // 지도의 중심 좌표
      level: 3, // 지도 확대 레벨
    };
    const map = new kakao.maps.Map(mapContainer, options); // 지도 생성
    const imageSrc = '/MapPin.svg';
    const imageSize = new kakao.maps.Size(36, 40); // 마커 이미지의 크기
    const imgOptions = {};
    const markerImage = new kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imgOptions
    );
    const marker = new kakao.maps.Marker({
      map: map,
      position: new kakao.maps.LatLng(info.latitude, info.longitude),
      title: info.name,
      image: markerImage, // 마커이미지 설정
    });
    kakao.maps.event.addListener(marker, 'click', () => {
      const markerPosition = marker.getPosition();
      const adjustedPosition = new kakao.maps.LatLng(
        markerPosition.getLat() - offsetY, // 위도를 조금 낮춰 지도 중심 이동
        markerPosition.getLng()
      );
      map.panTo(adjustedPosition);
      setIsModalOpen(true);
    });
  }, [info]);
  return (
    <Container>
      <Header>
        <BackButton onClick={onClickBtn}>
          <img src={backIcon} alt='Back' />
        </BackButton>
        <AreaText>위치</AreaText>
      </Header>
      <Map id='map'></Map>
      {isModalOpen && (
        <LocationModal onClose={() => setIsModalOpen(false)} info={info} />
      )}
    </Container>
  );
};
export default LocationPage;
const Container = styled.div`
  width: 100%;
  overflow: hidden;
  //테블릿
  @media only screen and (min-width: 800px) and (max-width: 1179px) {
    padding: 0px 96px;
  }
  // 데스크탑 일반
  @media (min-width: 1180px) {
    padding: 0px 240px;
  }
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px 0;
  padding: 0 25px;
  position: relative;
  box-sizing: border-box;
`;

const BackButton = styled.div`
  cursor: pointer;
  position: absolute;
  left: 25px;
`;

const AreaText = styled.div`
  font-size: 22px;
  font-family: 'Pretendard-SemiBold';
  color: #262627;
`;
const Map = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1;
`;
