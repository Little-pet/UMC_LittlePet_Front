import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import backIcon from '#/assets/뒤로가기.svg';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import LocationModal from '#/components/Hospital/LocationModal';
const LocationPage = () => {
  const [map, setMap] = useState<kakao.maps.Map | null>(null); // 카카오맵 객체
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true); // 모달 표시 여부
  const navigate = useNavigate();
  const onClickBtn = () => {
    navigate(-1); // 바로 이전 페이지로 이동, '/main' 등 직접 지정도 당연히 가능
  };
  return (
    <Container>
      <Header>
        <BackButton onClick={onClickBtn}>
          <img src={backIcon} alt='Back' />
        </BackButton>
        <AreaText>위치</AreaText>
      </Header>
      <Map
        id='map'
        center={{
          lat: 37.566826,
          lng: 126.9786567,
        }}
        style={{
          width: '100%',
          height: '527px',
        }}
        level={3} // 지도의 확대 레벨
        onCreate={setMap}
      ></Map>
      {isModalOpen && <LocationModal onClose={() => setIsModalOpen(false)} />}
    </Container>
  );
};
export default LocationPage;
const Container = styled.div`
  @media only screen and (min-width: 800px) {
    padding: 0 96px;
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
