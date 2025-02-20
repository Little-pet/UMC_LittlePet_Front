import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import arrowIcon from '#/assets/arrow.svg';
import mapIcon from '#/assets/map.svg';
import HospitalItem from '#/components/Hospital/HospitalItem';
import AreaModal from '#/components/Hospital/AreaModal';
import banner from '@assets/banner/병원 찾기 배너.svg';
import FilterSection from '#/components/Hospital/FilterSection';
import { useHospitalStore } from '#/store/hospitalStore';
import { Hospital } from '#/store/hospitalStore';
const HospitalPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string | null>(
    localStorage.getItem('selectedArea') || '강남구'
  );
  const [areaId, setAreaId] = useState<number>(
    Number(localStorage.getItem('areaId')) || 6
  );

  const [hospitalList, setHospitalList] = useState<Hospital[]>();

  const filters = [
    { type: 'distance', title: '가까운 순' },
    { type: 'review', title: '리뷰 많은 순' },
    { type: 'rate', title: '평점 높은 순' },
  ];
  const [selected, setSelected] = useState<string>('');
  const handleClick = (type: string) => {
    setSelected(type);
  };
  const handleAreaSelect = (area: string, code: number) => {
    setSelectedArea(area); // 선택된 지역을 상태로 저장
    setAreaId(code);
    localStorage.setItem('selectedArea', area);
    localStorage.setItem('areaId', code.toString());
  };

  const { fetchHospitalsByRegion } = useHospitalStore();

  useEffect(() => {
    fetchHospitalsByRegion(areaId);
  }, [areaId, fetchHospitalsByRegion]);

  return (
    <>
      <Banner src={banner} />
      <MainContainer>
        <TopActions>
          <AreaModalButton onClick={() => setIsModalOpen(!isModalOpen)}>
            <AreaText>서울시 {selectedArea}</AreaText>
            <ArrowIcon src={arrowIcon} view={isModalOpen} />
          </AreaModalButton>
          <MapButton
            to='/health/hospital/map'
            state={{ locationData: selectedArea }}
          >
            <img src={mapIcon} />
            <MapText>지도보기</MapText>
          </MapButton>
        </TopActions>

        <FilterSection onSelect={setHospitalList} />

        <FilterContainer>
          {filters.map((filter, idx) => (
            <FilterButton
              key={idx}
              onClick={() => handleClick(filter.type)}
              isActive={selected === filter.type}
            >
              {filter.title}
            </FilterButton>
          ))}
        </FilterContainer>
        <div className='병원리스트' style={{ borderTop: '1px solid #E6E6E6' }}>
          {hospitalList?.map((item, idx) => {
            const openingHoursArray = item.openingHours.split('\n');
            const getTodayDay = () => {
              const days = ['일', '월', '화', '수', '목', '금', '토'];
              const today = new Date();
              return days[today.getDay()]; // 오늘의 요일을 반환 (예: '월')
            };
            const today = getTodayDay();
            // 오늘의 요일에 해당하는 항목을 선택
            const todayOpeningHour = openingHoursArray.find((item) =>
              item.startsWith(today)
            );
            return (
              <HospitalItem
                key={idx}
                imageSrc={item.imageUrl}
                name={item.name}
                hospitalId={item.id}
                comments={0}
                openStatus={todayOpeningHour}
                rating={item.rating}
              />
            );
          })}
        </div>
        {isModalOpen && (
          <Overlay>
            <AreaModal
              onClose={() => setIsModalOpen(false)}
              onSelect={handleAreaSelect}
              area={selectedArea}
            />
          </Overlay>
        )}
      </MainContainer>
    </>
  );
};

export default HospitalPage;

const Banner = styled.img`
  width: 100%;
  @media (max-width: 800px) {
    display: none;
  }
`;

const MainContainer = styled.div`
  position: relative;
  overflow-y: hidden;
  height: 656px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TopActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
  padding: 0 25px;
  @media only screen and (min-width: 800px) {
    padding: 0 96px;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 10px;
  padding: 0 25px;
  @media only screen and (min-width: 800px) {
    padding: 0 96px;
  }
`;

const MapButton = styled(Link)`
  text-decoration: none;
  display: flex;
  width: 90px;
  height: 27px;
  border-radius: 5px;
  border: 1px solid #e6e6e6;
  padding: 6px 10px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-around;
`;

const MapText = styled.div`
  font-size: 12px;
  font-family: Pretendard-SemiBold;
  color: #737373;
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
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000080;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const FilterButton = styled.button<{ isActive: boolean }>`
  border: none;
  padding: 6px 10px;
  border-radius: 15px;
  font-size: 12px;
  background-color: ${({ isActive }) => (isActive ? '#6EA8FE' : '#F0F0F0')};
  font-family: Pretendard-Medium;
  color: ${({ isActive }) => (isActive ? 'white' : 'black')};
  cursor: pointer;
`;
const ArrowIcon = styled.img<{ view: boolean }>`
  transition: transform 0.3s ease-in-out;
  transform: ${({ view }) => (view ? 'rotate(180deg)' : 'rotate(0deg)')};
`;
