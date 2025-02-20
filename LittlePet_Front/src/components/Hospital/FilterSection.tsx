import { useState, useEffect } from 'react';
import arrowIcon from '#/assets/arrow.svg';
import styled from 'styled-components';
import { useHospitalStore } from '#/store/hospitalStore';
import { useQuery } from '@tanstack/react-query';

const FilterSection = ({ onSelect }) => {
  const times = ['전체', '영업중', '24시간', '주말'];
  const [view, setView] = useState<boolean>(false);
  const [timeText, setTimeText] = useState<string>('전체');
  const { hospitalsByRegion, fetchHospitalsByFilter } = useHospitalStore();

  const { data } = useQuery({
    queryKey: ['hospitalByFilter', timeText],
    queryFn: async () =>
      timeText ? fetchHospitalsByFilter(timeText) : Promise.resolve(null),

    enabled: !!timeText,
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (hospitalsByRegion && data) {
      const filteredHospitals =
        timeText === '전체'
          ? hospitalsByRegion
          : data.filter((hospital) =>
              hospitalsByRegion.some(
                (regionHospital) => regionHospital.id === hospital.id
              )
            );
      onSelect(filteredHospitals);
    }
  }, [data, hospitalsByRegion, timeText, onSelect]);
  useEffect(() => {
    setTimeText('전체');
  }, [hospitalsByRegion]);
  return (
    <MiddleActions>
      <AreaModalButton>
        <AreaText color='#6EA8FE'>{timeText}</AreaText>
      </AreaModalButton>
      <DropdownContainer
        onClick={() => {
          setView(!view);
        }}
      >
        <DropDownBox>
          <DropDownText>{timeText}</DropDownText>
          <ArrowIcon src={arrowIcon} view={view} />
        </DropDownBox>
        {view && (
          <DropdownMenu>
            {times.map((time, index) => (
              <DropDownText
                onClick={() => {
                  setTimeText(time);
                  setView(false);
                }}
                key={index}
              >
                {time}
              </DropDownText>
            ))}
          </DropdownMenu>
        )}
      </DropdownContainer>
    </MiddleActions>
  );
};
export default FilterSection;

const DropdownContainer = styled.div`
  position: relative;
`;
const DropDownBox = styled.div`
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
  cursor: pointer;
`;
const DropDownText = styled.div`
  font-size: 14px;
  color: #262627;
  font-family: 'Pretendard-SemiBold';
  align-self: center;
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
  cursor: pointer;
`;
const ArrowIcon = styled.img<{ view: boolean }>`
  transition: transform 0.3s ease-in-out;
  transform: ${({ view }) => (view ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const MiddleActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 25px;
`;

const AreaModalButton = styled.div`
  display: flex;
  gap: 8px;
`;
const AreaText = styled.div<{ color?: string }>`
  font-size: 22px;
  font-family: Pretendard-SemiBold;
  color: ${(props) => props.color || '#262627'}; /* 기본값 설정 */
`;
