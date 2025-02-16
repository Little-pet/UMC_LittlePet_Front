import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import arrowIcon from '#/assets/arrow.svg';
import backIcon from '#/assets/뒤로가기.svg';
import InfoModal from '#/components/Hospital/InfoModal';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useHospitalStore } from '#/context/hospitalStore';
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [timeText, setTimeText] = useState<string>('');
  const { state } = useLocation();
  const [info, setInfo] = useState<Marker | null>(null); // 선택된 마커 정보
  const [markers, setMarkers] = useState<Marker[]>([]); // 마커 배열
  const [map, setMap] = useState<kakao.maps.Map | null>(null); // 카카오맵 객체
  const { locationData } = state || {};

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
  const times = ['영업중', '24시간', '주말'];

  const handleTimeClick = (name: string) => {
    setTimeText(name);
    setView(false);
  };
  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(`${locationData}`, (data, status) => {
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
            setIsDropdownOpen(!isDropdownOpen);
          }}
        >
          {timeText === '' ? (
            <MapText>진료 시간 변경</MapText>
          ) : (
            <DropDownText>{timeText}</DropDownText>
          )}
          <ArrowIcon src={arrowIcon} isDropdownOpen={isDropdownOpen} />
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
          height: '100%',
        }}
        level={3} // 지도의 확대 레벨
        onCreate={setMap}
      >
        {hospitalsByRegion?.map((marker) => (
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
