import { useState, useEffect } from 'react';
import arrowIcon from '#/assets/arrow.svg';
import styled from 'styled-components';
import { useHospitalStore } from '#/context/hospitalStore';

const FilterSection = ({ onSelect }) => {
  const times = ['전체', '영업중', '24시간', '주말'];
  const [view, setView] = useState<boolean>(false);
  const [timeText, setTimeText] = useState<string>('전체');
  const { hospitalsByRegion, fetchHospitalsByFilter, hospitalsByFilter } =
    useHospitalStore();
  useEffect(() => {
    if (timeText !== '전체') {
      fetchHospitalsByFilter(timeText);
    }
  }, [timeText]);

  useEffect(() => {
    if (hospitalsByRegion && hospitalsByFilter) {
      const filteredHospitals =
        timeText === '전체'
          ? hospitalsByRegion
          : hospitalsByFilter.filter((hospital) =>
              hospitalsByRegion.some(
                (regionHospital) => regionHospital.id === hospital.id
              )
            );
      onSelect(filteredHospitals);
    }
  }, [hospitalsByFilter, hospitalsByRegion, timeText, onSelect]);
  if (!hospitalsByRegion) return <div>Loading...</div>;

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
        <DropDownText>{timeText}</DropDownText>

        <ArrowIcon src={arrowIcon} view={view} />
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
const MiddleActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 25px;
  @media only screen and (min-width: 800px) {
    padding: 0 96px;
  }
`;

const AreaModalButton = styled.div`
  display: flex;
  gap: 8px;
  cursor: pointer;
`;
const AreaText = styled.div<{ color?: string }>`
  font-size: 22px;
  font-family: Pretendard-SemiBold;
  color: ${(props) => props.color || '#262627'}; /* 기본값 설정 */
`;
