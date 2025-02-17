import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import MobileAddButton from '#/components/Health/RecordHealthButton/MobileAddButton';
import left from '#/assets/left.svg';
import right from '#/assets/right.svg';
import banner from '@assets/banner/banner-health.svg';
import { useHealthRecordsStore } from '#/context/useHealthRecordsStore';
// 요일 배열
const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

// 해당 월의 날짜 가져오기 (이전 달의 마지막 며칠 포함)
const getMonthlyDates = (selectedDate: dayjs.Dayjs) => {
  const startOfMonth = selectedDate.startOf('month');
  const endOfMonth = selectedDate.endOf('month');

  const firstDayIndex = startOfMonth.day(); // 해당 월의 시작 요일 (0: 일요일 ~ 6: 토요일)
  const totalDays = endOfMonth.date(); // 해당 월의 총 일수

  const previousMonth = startOfMonth.subtract(1, 'month');
  const previousMonthDays = previousMonth.daysInMonth(); // 이전 달 총 일수

  const dates = [];

  // 이전 달 날짜 추가
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    dates.push(previousMonth.date(previousMonthDays - i));
  }

  // 현재 월 날짜 추가
  for (let i = 1; i <= totalDays; i++) {
    dates.push(startOfMonth.date(i));
  }

  return dates;
};

const CalendarPage: React.FC = () => {
  const { petId } = useParams<{ petId: string }>();
  const location = useLocation();
  const petName = location.state?.petName;
  const navigate = useNavigate();
  const { recordDates, fetchRecordDates } = useHealthRecordsStore();
  const initialDate = location.state?.selectedDate
    ? dayjs(location.state.selectedDate)
    : dayjs();

  // 기본값을 이전 페이지에서 선택한 날짜로 설정

  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(initialDate);
  const [currentMonth, setCurrentMonth] = useState<dayjs.Dayjs>(initialDate);

  useEffect(() => {
    if (petId) {
      fetchRecordDates(petId);
    }
  }, [petId]);

  useEffect(() => {
    console.log('recordDates업데이트됨:', recordDates);
  }, [recordDates]);

  // 해당 월의 모든 날짜 가져오기 (이전 달 포함)
  const monthlyDates = getMonthlyDates(currentMonth);

  const handleMonthChange = (offset: number) => {
    setCurrentMonth(currentMonth.add(offset, 'month'));
  };

  const handleDaySelect = (date: any) => {
    setSelectedDate(date);
    navigate(`/health/record/detail/${petId}`, {
      state: { selectedDate: date.format('YYYY-MM-DD'), petName: petName },
    });
  };

  return (
    <ContainerWrapper>
      <Banner src={banner} />
      <Container>
        <Title>{petName}의 건강 기록</Title>
        <CalendarContainer>
          <MonthNavigation>
            <NavButton src={left} onClick={() => handleMonthChange(-1)} />
            <Month>{currentMonth.format('YYYY년 M월')}</Month>
            <NavButton src={right} onClick={() => handleMonthChange(1)} />
          </MonthNavigation>

          <CalendarGrid>
            {daysOfWeek.map((day, index) => (
              <DayLabel key={index}>{day}</DayLabel>
            ))}

            {monthlyDates.map((date, index) => {
              const formattedDate = date.format('YYYY-MM-DD');
              const hasRecord = recordDates.includes(formattedDate);
              return (
                <DateItem
                  key={index}
                  isSelected={dayjs(selectedDate).isSame(date, 'day')}
                  isCurrentMonth={date.month() === currentMonth.month()}
                  onClick={() => handleDaySelect(date)}
                >
                  {hasRecord && <RecordDot />}
                  <DateNumber
                    isSelected={dayjs(selectedDate).isSame(date, 'day')}
                  >
                    {date.date()}
                  </DateNumber>
                </DateItem>
              );
            })}
          </CalendarGrid>
        </CalendarContainer>
        <MobileAddButton selectedDate={selectedDate} />
      </Container>
    </ContainerWrapper>
  );
};

export default CalendarPage;
// Styled Components

const Banner = styled.img`
  width: 100vw;
  @media (max-width: 800px) {
    display: none;
  }
`;

const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  padding: 0 25px;
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
  position: relative;
  height: 100%;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 22px;
  font-weight: 600;
  margin: 34px 0 36px;
  @media only screen and (min-width: 800px) {
    font-size: 26px;
  }
`;

const CalendarContainer = styled.div`
  height: 386px;
  border-radius: 24px;
  padding: 32px 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 32px;
  background-color: #fafafa;
`;

const MonthNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 24px;
`;

const Month = styled.h1`
  font-size: 16px;
  font-weight: 600;
`;

const NavButton = styled.img`
  height: 24px;
  cursor: pointer;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
`;

const DateItem = styled.div<{ isSelected: boolean; isCurrentMonth: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  height: 42px;
  width: 44px;
  color: #6a6a6d;
  font-weight: 400;
  align-items: center;
  font-size: 14px;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 50px;
  background-color: ${({ isSelected }) =>
    isSelected ? '#6EA8FE' : 'transparent'};
  color: ${({ isSelected, isCurrentMonth }) =>
    isSelected ? '#fff' : isCurrentMonth ? '#6a6a6d' : '#D5D5D6'};
  position: relative;
`;

const DateNumber = styled.div<{ isSelected: boolean }>`
  text-align: center;
`;

const RecordDot = styled.div`
  width: 4px;
  height: 4px;
  background-color: #6ea8fe;
  border-radius: 50%;
  position: absolute;
  top: 5px;
`;

const DayLabel = styled.div`
  height: 42px;
  padding: 8px;
  box-sizing: border-box;
  font-weight: 400;
  font-size: 12px;
  color: #d5d5d6;
`;
