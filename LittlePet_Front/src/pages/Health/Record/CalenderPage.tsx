import React, { useState } from 'react';
import styled from 'styled-components';
import { usePets } from '#/context/PetContext';
import dayjs from 'dayjs';
import { useParams, useLocation } from 'react-router-dom';
import MobileAddButton from '#/components/Health/RecordHealthButton/MobileAddButton';
import left from '#/assets/left.svg';
import right from '#/assets/right.svg';

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
  const { pets } = usePets();
  const selectedPet = pets.find((pet) => pet.id.toString() === petId);
  const location = useLocation();
  console.log('Received location state:', location.state);
  const initialDate = location.state?.selectedDate
    ? dayjs(location.state.selectedDate)
    : dayjs();
  console.log('Parsed initialDate:', initialDate.format('YYYY-MM-DD'));

  // 기본값을 이전 페이지에서 선택한 날짜로 설정
  // 추후 백엔드와 연동시 수정할 예정정
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(initialDate);
  const [currentMonth, setCurrentMonth] = useState<dayjs.Dayjs>(initialDate);

  // 해당 월의 모든 날짜 가져오기 (이전 달 포함)
  const monthlyDates = getMonthlyDates(currentMonth);

  const handleMonthChange = (offset: number) => {
    setCurrentMonth(currentMonth.add(offset, 'month'));
  };

  return (
    <Container>
      <Title>{selectedPet?.name}의 건강 기록</Title>
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
          {monthlyDates.map((date, index) => (
            <DateItem
              key={index}
              isSelected={dayjs(selectedDate).isSame(date, 'day')}
              isCurrentMonth={date.month() === currentMonth.month()}
              onClick={() => setSelectedDate(date)}
            >
              <DateNumber isSelected={dayjs(selectedDate).isSame(date, 'day')}>
                {date.date()}
              </DateNumber>
            </DateItem>
          ))}
        </CalendarGrid>
      </CalendarContainer>
      <MobileAddButton selectedDate={selectedDate} />
    </Container>
  );
};

export default CalendarPage;

// Styled Components
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
  justify-content: center;
  height: 42px;
  width: 44px;
  color: #6a6a6d;
  font-weight: 400;
  text-align: center;
  align-items: center;
  font-size: 14px;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 50px;
  background-color: ${({ isSelected }) =>
    isSelected ? '#6EA8FE' : 'transparent'};
  color: ${({ isSelected, isCurrentMonth }) =>
    isSelected ? '#fff' : isCurrentMonth ? '#6a6a6d' : '#D5D5D6'};
`;

const DayLabel = styled.div`
  height: 42px;
  padding: 8px;
  box-sizing: border-box;
  font-weight: 400;
  font-size: 12px;
  color: #d5d5d6;
`;

const DateNumber = styled.div``;
