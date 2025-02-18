import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import arrowIcon from '#/assets/arrow.svg';
import backIcon from '#/assets/뒤로가기.svg';
import InfoModal from '#/components/Hospital/InfoModal';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useHospitalStore } from '#/context/hospitalStore';
import FilterSection from '#/components/Hospital/FilterSection';
// 타입 정의
interface Hospital {
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

const MapPage: React.FC = () => {
  const { state } = useLocation();
  const [info, setInfo] = useState<Hospital | null>(null); // 선택된 마커 정보
  const [map, setMap] = useState<kakao.maps.Map | null>(null); // 카카오맵 객체
  const { locationData } = state || {};
  const [hospitalList, setHospitalList] = useState<Hospital[]>();
  const { hospitalsByRegion } = useHospitalStore();
  console.log(hospitalsByRegion);
  // 마커의 위치로 지도의 중심 좌표 이동하기
  const moveLatLng = (x, y) => {
    const newLatLng = new kakao.maps.LatLng(x, y);
    map?.setLevel(3);
    map?.panTo(newLatLng);
    const infowindow = new kakao.maps.InfoWindow({
      position: new kakao.maps.LatLng(x, y),
      content: 'open me plz.',
    });

    infowindow.close();
  };

  // 클릭한 마커로 중심 좌표 이동 및 검색 수행 함수
  useEffect(() => {
    if (!map) return;
  }, [map]);

  console.log(locationData);

  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(`${locationData}`, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        for (let i = 0; i < data.length; i++) {
          bounds.extend(
            new kakao.maps.LatLng(Number(data[i].y), Number(data[i].x))
          );
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    });
  }, [map]);
  /*   console.log(info); */
  //console.log(markers);
  return (
    <Container>
      <Header>
        <Link
          to='/health/hospital'
          style={{ cursor: 'pointer', position: 'absolute', left: '25px' }}
        >
          <img src={backIcon} />
        </Link>
        <AreaText>지도에서 찾기</AreaText>
      </Header>
      <FilterSection onSelect={setHospitalList} />

      <Map
        id='map'
        center={{
          lat: 37.566826,
          lng: 126.9786567,
        }}
        style={{
          width: '100%',
          height: '100%',
        }}
        level={3} // 지도의 확대 레벨
        onCreate={setMap}
      >
        {hospitalList?.map((marker) => (
          <MapMarker
            key={marker.id}
            position={{ lat: marker.latitude, lng: marker.longitude }}
            onClick={() => {
              setInfo(marker);
              moveLatLng(marker.latitude, marker.longitude);
            }}
          ></MapMarker>
        ))}
      </Map>
      {info && (
        <InfoModal
          info={info}
          onClose={() => {
            setInfo(null); // 모달 닫을 때 info 초기화
            setIsModalOpen(false);
          }}
        />
      )}
    </Container>
  );
};

export default MapPage;
const Container = styled.div`
  position: relative;
  overflow-y: hidden;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media only screen and (min-width: 800px) {
    padding: 0 96px;
  }
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  padding: 0 25px;
  position: relative;
  box-sizing: border-box;
`;
const ControlBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 25px;
`;
const DropdownContainer = styled.div`
  text-decoration: none;
  display: flex;
  width: 112px;
  height: 27px;
  border-radius: 5px;
  border: 1px solid #e6e6e6;
  padding: 6px 10px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const DropDownText = styled.div`
  font-size: 14px;
  color: #262627;
  font-family: 'Pretendard-SemiBold';
  align-self: center;
`;
const AreaText = styled.div<{ color?: string }>`
  font-size: 22px;
  font-family: Pretendard-SemiBold;
  color: ${(props) => props.color || '#262627'}; /* 기본값 설정 */
`;

const AreaModalButton = styled.div`
  display: flex;
  gap: 8px;
  cursor: pointer;
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 18px;
  right: 0px;
  width: 112px;
  height: 150px;
  background: #ffffff;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  padding: 20px 25px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 10;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const ArrowIcon = styled(({ ...rest }) => <img {...rest} />)`
  transition: transform 0.3s ease-in-out;
  transform: ${({ isDropdownOpen }) =>
    isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
`;
