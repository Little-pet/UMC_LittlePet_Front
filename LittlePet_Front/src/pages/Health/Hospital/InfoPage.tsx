import styled from 'styled-components';
import clockIcon from '#/assets/진료시간 아이콘.svg';
import callIcon from '#/assets/전화.svg';
import boardIcon from '#/assets/연중무휴 아이콘.svg';
import arrowIcon from '#/assets/arrow.svg';
import { useState } from 'react';
import { useHospitalStore } from '#/store/hospitalStore';
const InfoPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { hospitalDetail } = useHospitalStore();

  if (!hospitalDetail) return <div>Loading...</div>;
  const openingHoursArray = hospitalDetail.openingHours.split('\n');
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
    <Details>
      <Title>병원 정보</Title>
      <div onClick={() => setIsOpen(!isOpen)}>
        <Box>
          <Icon src={clockIcon} />
          {hospitalDetail.open === true ? (
            <OpenStatus>진료중</OpenStatus>
          ) : (
            <CloseStatus>진료 종료</CloseStatus>
          )}

          <Text>{todayOpeningHour}</Text>
          <ArrowIcon src={arrowIcon} isOpen={isOpen} />
        </Box>
        <div>
          {isOpen &&
            openingHoursArray.map((item, idx) => (
              <ExtraText key={idx}>{item}</ExtraText>
            ))}
        </div>
      </div>

      <div>
        {hospitalDetail.closedDay
          .split('\n')
          .filter(Boolean) // 빈 문자열 제거
          .map((line, index) =>
            index === 0 ? (
              <Box key={index}>
                <Icon src={boardIcon} />
                <Text style={{ display: 'inline' }}>{line}</Text>
              </Box>
            ) : (
              <ExtraText key={index}>{line}</ExtraText>
            )
          )}
      </div>
      <Box>
        <Icon src={callIcon} />
        <Text>{hospitalDetail.phoneNumber}</Text>
      </Box>
    </Details>
  );
};
export default InfoPage;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 25px;
  @media only screen and (min-width: 800px) {
    padding: 20px 96px;
  }
`;

const Title = styled.div`
  font-size: 18px;
  font-family: Pretendard-SemiBold;
  color: black;
`;

const Box = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Text = styled.div`
  font-size: 12px;
  font-family: Pretendard-Medium;
  color: #737373;
`;
const ExtraText = styled.div`
  font-size: 12px;
  font-family: Pretendard-Medium;
  color: #737373;
  margin-left: 29.5px;
  height: 20px;
  display: flex;
  align-items: center;
  align-self: center;
`;
const OpenStatus = styled.div`
  font-size: 12px;
  font-family: Pretendard-Medium;
  color: #6ea8fe;
`;
const CloseStatus = styled.div`
  font-size: 12px;
  font-family: Pretendard-Medium;
  color: #737373;
`;
const ArrowIcon = styled.img<{ isOpen: boolean }>`
  width: 10px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;
const Icon = styled.img`
  width: 20px;
`;
