import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import arrowIcon from '#/assets/arrow.svg';
import mapIcon from '#/assets/map.svg';
import HospitalItem from '#/components/Hospital/HospitalItem';
import AreaModal from '#/components/Hospital/AreaModal';
import HospitalImg from '#/assets/image.png';
import banner from '@assets/banner/banner-health.svg';
import { useHospitalStore } from '#/context/hospitalStore';

const HospitalPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState<string | null>(
    localStorage.getItem('selectedArea') || '동대문구'
  );
  const [areaId, setAreaId] = useState<number>(
    Number(localStorage.getItem('areaId')) || 6
  );
  const [view, setView] = useState<boolean>(false);
  const [timeText, setTimeText] = useState<string>('');
  const [hospitals, setHospitals] = useState();

  const times = ['영업중', '24시간', '주말'];
  const filters = [
    {
      type: 'distance',
      title: '가까운 순',
    },
    {
      type: 'review',
      title: '리뷰 많은 순',
    },
    {
      type: 'rate',
      title: '평점 높은 순',
    },
  ];
  const [selected, setSelected] = useState<string>('distance');
  const handleClick = (type: string) => {
    setSelected(type);
  };
  const handleAreaSelect = (area: string, code: number) => {
    setSelectedArea(area); // 선택된 지역을 상태로 저장
    setAreaId(code);
    localStorage.setItem('selectedArea', area);
    localStorage.setItem('areaId', code.toString());
  };

  const handleTimeClick = (name: string) => {
    setTimeText(name);
    setView(false);
  };
  const { hospitalsByRegion, fetchHospitalsByRegion } = useHospitalStore();

  useEffect(() => {
    fetchHospitalsByRegion(areaId);
  }, [areaId, fetchHospitalsByRegion]);

  if (!hospitalsByRegion) return <div>Loading...</div>;
  return (
    <>
      <Banner src={banner} />
      <MainContainer>
        <TopActions>
          <AreaModalButton onClick={() => setIsModalOpen(!isModalOpen)}>
            <AreaText>서울시 {selectedArea}</AreaText>
            <ArrowIcon src={arrowIcon} />
          </AreaModalButton>
          <MapButton
            to='/health/hospital/map'
            state={{ locationData: selectedArea }}
          >
            <img src={mapIcon} />
            <MapText>지도보기</MapText>
          </MapButton>
        </TopActions>
        <MiddleActions>
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
            <ArrowIcon src={arrowIcon} view={view} />
            {view && (
              <DropdownMenu>
                {times.map((time, index) => (
                  <DropDownText
                    onClick={() => handleTimeClick(time)}
                    key={index}
                  >
                    {time}
                  </DropDownText>
                ))}
              </DropdownMenu>
            )}
          </DropdownContainer>
        </MiddleActions>
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
          {hospitalsByRegion.map((item, idx) => (
            <HospitalItem
              imageSrc={HospitalImg}
              name={item.name}
              hospitalId={item.id}
              distance={512}
              rating={Number((Math.random() * (5 - 4.5) + 4.5).toFixed(1))}
              comments={0}
              openStatus={item.closedDay}
            />
          ))}
        </div>
        {isModalOpen && (
          <Overlay>
            <AreaModal
              onClose={() => setIsModalOpen(false)}
              onSelect={handleAreaSelect}
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

const MiddleActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  cursor: pointer;
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
const DropdownMenu = styled.ul`
  position: absolute;
  top: 18px;
  right: 0px;
  width: 112px;
  height: 126px;
  background: #ffffff;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  padding: 18px 25px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 10;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
const ArrowIcon = styled(({ view, ...rest }) => <img {...rest} />)`
  transition: transform 0.3s ease-in-out;
  transform: ${({ view }) => (view ? 'rotate(180deg)' : 'rotate(0deg)')};
`;
