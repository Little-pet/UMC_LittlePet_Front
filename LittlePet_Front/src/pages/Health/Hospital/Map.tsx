import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import arrowIcon from '#/assets/arrow.svg';
import backIcon from '#/assets/뒤로가기.svg';
import InfoModal from '#/components/Hospital/InfoModal';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
// 타입 정의
interface Marker {
  id: number;
  x: number; // 경도 (longitude)
  y: number; // 위도 (latitude)
}
interface LocationState {
  locationData: string;
}

const MapPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true); // 모달 표시 여부
  const [view, setView] = useState<boolean>(false);
  const [timeText, setTimeText] = useState<string>('');
  const { state } = useLocation();
  const [info, setInfo] = useState<Marker | null>(null); // 선택된 마커 정보
  const [markers, setMarkers] = useState<Marker[]>([]); // 마커 배열
  const [map, setMap] = useState<kakao.maps.Map | null>(null); // 카카오맵 객체
  const { locationData } = state || {};
  // 마커의 위치로 지도의 중심 좌표 이동하기
  const moveLatLng = (data: Marker) => {
    console.log(data);
    const newLatLng = new kakao.maps.LatLng(data.y, data.x);
    map?.panTo(newLatLng);
    const infowindow = new kakao.maps.InfoWindow({
      position: new kakao.maps.LatLng(data.y, data.x),
      content: 'open me plz.',
    });

    infowindow.close();
  };

  // 클릭한 마커로 중심 좌표 이동 및 검색 수행 함수
  useEffect(() => {
    if (!map) return;
  }, [map]);

  console.log(locationData);
  const times = ['영업중', '24시간', '주말'];

  const handleTimeClick = (name: string) => {
    setTimeText(name);
    setView(false);
  };
  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(`${locationData} 동물병원`, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        for (let i = 0; i < data.length; i++) {
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(data);

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
      <ControlBar>
        <AreaModalButton onClick={() => setIsModalOpen(!isModalOpen)}>
          <AreaText color='#6EA8FE'>
            {timeText === '' ? '영업중' : timeText}
          </AreaText>
        </AreaModalButton>

        <DropdownContainer
          onClick={() => {
            setView(!view);
          }}
        >
          {timeText === '' ? (
            <MapText>진료 시간 변경</MapText>
          ) : (
            <DropDownText>{timeText}</DropDownText>
          )}
          <img src={arrowIcon} />
          {view && (
            <DropdownMenu>
              {times.map((time, index) => (
                <DropDownText onClick={() => handleTimeClick(time)} key={index}>
                  {time}
                </DropDownText>
              ))}
            </DropdownMenu>
          )}
        </DropdownContainer>
      </ControlBar>

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
      >
        {markers.map((marker) => (
          <MapMarker
            key={marker.id}
            position={{ lat: marker.y, lng: marker.x }}
            onClick={() => {
              setInfo(marker);
              moveLatLng(marker);
            }}
          ></MapMarker>
        ))}
      </Map>
      {info && (
        <InfoModal
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
  overflowy: hidden;
  width: 100%;
  height: 656px;
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
const MapText = styled.div`
  font-size: 12px;
  font-family: Pretendard-SemiBold;
  color: #737373;
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
  height: 126px;
  background: #ffffff;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  padding: 15px 25px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 10;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
