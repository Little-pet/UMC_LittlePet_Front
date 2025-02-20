import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import backIcon from '#/assets/뒤로가기.svg';
import InfoModal from '#/components/Hospital/InfoModal';
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
const { kakao } = window as any;

const MapPage: React.FC = () => {
  const { state } = useLocation();
  const [hospitalList, setHospitalList] = useState<Hospital[]>();
  const [info, setInfo] = useState<Hospital | null>(null); // 선택된 마커 정보
  const { locationData } = state || {};

  useEffect(() => {
    const mapContainer = document.getElementById('map');
    const offsetY = 0.01;
    const position = new kakao.maps.LatLng(33.450701, 126.570667);
    const options = {
      center: position, // 지도의 중심 좌표
      level: 3, // 지도 확대 레벨
    };
    const map = new kakao.maps.Map(mapContainer, options); // 지도 생성

    // 장소 검색 객체를 생성합니다
    const ps = new kakao.maps.services.Places();
    // 키워드로 장소를 검색합니다
    ps.keywordSearch(locationData, placesSearchCB);

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB(data, status) {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        if (map) {
          data.forEach((place) => {
            const latLng = new kakao.maps.LatLng(place.y - offsetY, place.x);
            bounds.extend(latLng); // 지도 범위에 추가
          });
          map.setBounds(bounds);
        }
      }
    }

    if (hospitalList) {
      hospitalList.forEach((el) => {
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
          position: new kakao.maps.LatLng(el.latitude, el.longitude),
          title: el.name,
          image: markerImage, // 마커이미지 설정
        });

        kakao.maps.event.addListener(marker, 'click', () => {
          const markerPosition = marker.getPosition();

          const adjustedPosition = new kakao.maps.LatLng(
            markerPosition.getLat() - offsetY, // 위도를 조금 낮춰 지도 중심 이동
            markerPosition.getLng()
          );

          map.panTo(adjustedPosition);
          setInfo(el);
        });
      });
    }
  }, [locationData, hospitalList]);

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
      <Map id='map'></Map>
      {info && (
        <InfoModal
          info={info}
          onClose={() => {
            setInfo(null); // 모달 닫을 때 info 초기화
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
  margin-top: 30px;
  padding: 0 25px;
  position: relative;
  box-sizing: border-box;
`;

const AreaText = styled.div<{ color?: string }>`
  font-size: 22px;
  font-family: Pretendard-SemiBold;
  color: ${(props) => props.color || '#262627'}; /* 기본값 설정 */
`;
const Map = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1;
`;
