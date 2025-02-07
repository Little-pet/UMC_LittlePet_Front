import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { usePets } from '#/context/PetContext';
import calendarIcon from '@assets/Calender.svg';
import MobileAddButton from '#/components/Health/RecordHealthButton/MobileAddButton';
import normal from '@assets/정상.svg';
//import abnormal from '@assets/이상.svg';

// 한 주의 날짜를 가져오는 유틸리티 함수 (현재 날짜 기준 앞뒤 3일)
const getSurroundingDates = (selectedDate: dayjs.Dayjs, range: number) => {
  return Array.from({ length: range * 2 + 1 }, (_, i) =>
    selectedDate.subtract(range, 'day').add(i, 'day')
  );
};

const PastRecordPage: React.FC = () => {
  const { petId } = useParams<{ petId: string }>();
  const { pets } = usePets();
  const navigate = useNavigate();
  const selectedPet = pets.find((pet) => pet.id.toString() === petId);

  // 기본값을 오늘로 설정
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const calendarRef = useRef<HTMLDivElement>(null);
  const dateRange = 3; // 중앙을 포함해 양옆으로 3일 표시

  // 선택된 날짜를 기준으로 범위 내 날짜 가져오기
  const weekDates = getSurroundingDates(selectedDate, dateRange);

  // 선택한 날짜를 중앙에 위치시키는 함수
  const scrollToCenter = () => {
    if (calendarRef.current) {
      const selectedElement = calendarRef.current.querySelector(
        `[data-date='${selectedDate.format('YYYY-MM-DD')}']`
      );
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest',
        });
      }
    }
  };

  // 페이지가 로드될 때 오늘 날짜를 중앙에 위치
  useEffect(() => {
    scrollToCenter();
    console.log('Updated selectedDate:', selectedDate.format('YYYY-MM-DD'));
  }, [selectedDate]);

  // 건강 기록 데이터 (예시)
  const [recordData, setRecordData] = useState({
    weight: '',
    foodIntake: '',
    bowel: '',
    symptoms: '',
    healthStatus: '',
    diagnosis: '',
    treatment: '',
  });

  useEffect(() => {
    // 여기에서 API 요청을 통해 해당 날짜의 기록을 가져옴 (가정)
    // 실제 API 호출로 변경 가능
    const fetchHealthData = async () => {
      // 예시 데이터: 실제 API 호출로 대체
      const data = {
        weight: '20g',
        foodIntake: '정상',
        bowel: '적당한 무르기 · 갈색',
        symptoms: '기침',
        healthStatus: '양호',
        diagnosis: '일반 감기',
        treatment: '약 처방, 3일 뒤 재방문',
      };

      setRecordData(data);
    };

    fetchHealthData();
  }, [selectedDate]);

  return (
    <Container>
      <Title>{selectedPet?.name}의 건강 기록</Title>
      <Line />

      <SelectedDateContainer>
        <SelectedDate>{selectedDate.format('YYYY년 MM월 DD일')}</SelectedDate>
        <WholeCalender
          onClick={() =>
            navigate(`/health/record/calendar/${petId}`, {
              state: {
                selectedDate: dayjs().format('YYYY-MM-DD'),
                petName: selectedPet?.name,
              },
            })
          }
        >
          <img src={calendarIcon} alt='달력 아이콘' />
          전체보기
        </WholeCalender>
      </SelectedDateContainer>

      <CalendarScroll>
        {weekDates.map((date) => (
          <DateItem
            key={date.toString()}
            isSelected={dayjs(selectedDate).isSame(date, 'day')}
            onClick={() => setSelectedDate(date)}
          >
            <DayLabel>{date.format('ddd').toUpperCase()}</DayLabel>
            <DateNumber isSelected={dayjs(selectedDate).isSame(date, 'day')}>
              {date.date()}
            </DateNumber>
          </DateItem>
        ))}
      </CalendarScroll>

      {/* 추후에 건강 기록 내역 연동해 나타낼 예정 */}
      <HealthRecord>
        <RecordItem>
          <Label>체중</Label>
          <Value>
            20g
            <WeightChange>
              지난 기록 대비 <span> 유지</span>
            </WeightChange>
          </Value>
        </RecordItem>
        <RecordItem>
          <Label>식사량</Label>
          <MealValue>{recordData.foodIntake || '-'}</MealValue>
        </RecordItem>
        <RecordItem>
          <Label>대변 상태</Label>
          <Value>
            {recordData.bowel || '-'}
            <FecesBadge src={normal} alt={'정상'} />
          </Value>
        </RecordItem>
        <RecordItem>
          <Label>특이 증상</Label>
          <Value>{recordData.symptoms || '-'}</Value>
        </RecordItem>
        <RecordItem>
          <Label>건강 상태</Label>
          <Value>{recordData.healthStatus || '-'}</Value>
        </RecordItem>
        <RecordItem>
          <Label>진료 내역</Label>
          <HospitalRecordValue>
            <RecordRow>
              <ListTitle>진단명</ListTitle>
              <RecordText>{recordData.diagnosis || '-'}</RecordText>
            </RecordRow>
            <RecordRow>
              <ListTitle>검사 및 처방 내역</ListTitle>
              <RecordText>{recordData.treatment || '-'}</RecordText>
            </RecordRow>
          </HospitalRecordValue>
        </RecordItem>
      </HealthRecord>
      <MobileAddButton selectedDate={selectedDate} />
    </Container>
  );
};

export default PastRecordPage;

// Styled Components

const Container = styled.div`
  padding: 0 25px;
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
  position: relative;
  @media only screen and (min-width: 800px) {
    padding: 0 96px;
  }
`;

const Title = styled.h1`
  text-align: center;
  font-size: 22px;
  font-weight: 600;
  margin: 34px 0 36px;
`;

const Line = styled.hr`
  border: 1px solid #e6e6e6;
  margin: 0;
`;

const SelectedDateContainer = styled.div`
  height: 42px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 26px;
  padding: 10px 0;
  box-sizing: border-box;
`;

const SelectedDate = styled.div`
  font-size: 18px;
  font-weight: 600;
  height: 22px;
`;

const WholeCalender = styled.div`
  display: flex;
  gap: 6px;
  font-weight: 600;
  font-size: 12px;
  color: #737373;
  height: 16px;
  align-items: center;
  img {
    height: 16px;
  }
`;

const CalendarScroll = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 10px 0;
  white-space: nowrap;
  width: 100%; /* 전체 너비 */

  -ms-overflow-style: none; // IE, Edge용 스크롤 숨김
  scrollbar-width: none; // Firefox용 스크롤 숨김
  &::-webkit-scrollbar {
    display: none; // Chrome, Safari용 스크롤 숨김
  }
`;

const DateItem = styled.div<{ isSelected: boolean }>`
  display: flex;
  width: 48px;
  flex-direction: column;
  padding: 8px;
  color: #e6e6e6;
  font-weight: 400;
  text-align: center;
  align-items: center;
  font-size: 12px;
  box-sizing: border-box;
  height: 86px;
`;

const DayLabel = styled.div`
  height: 42px;
  padding: 8px;
`;

const DateNumber = styled.div<{ isSelected: boolean }>`
  width: 38px;
  height: 38px;
  line-height: 38px;
  border-radius: 50%;
  background: ${({ isSelected }) => (isSelected ? '#6EA8FE' : 'transparent')};
  color: ${({ isSelected }) => (isSelected ? '#FFFFFF' : '#737373')};
  text-align: center;
  position: relative;
`;

const HealthRecord = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RecordItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #262627;
  font-weight: 600;
  font-size: 14px;
`;

const Label = styled.div`
  height: 22px;
`;

const Value = styled.div`
  box-sizing: border-box;
  padding: 12px 18px;
  display: flex;
  justify-content: space-between;
  background-color: #fafafa;
  border-radius: 10px;
  height: 50px;
  align-items: center;
`;

const WeightChange = styled.div`
  height: 22px;
  width: auto;
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: #737373;
  align-items: center;
  font-weight: 500;
  font-family: 'Pretendard';
  span {
    font-size: 12px;
    font-weight: 600;
    color: #262627;
    margin-left: 8px;
  }
`;

const MealValue = styled(Value)`
  color: #6ea8fe;
`;

const FecesBadge = styled.img`
  height: 18px;
`;

const HospitalRecordValue = styled.div`
  box-sizing: border-box;
  padding: 12px 18px;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 2px 5px 0px #0000001a;
  gap: 6px;
`;

const RecordRow = styled.div`
  display: flex;
  align-items: center;
  height: 22px;
  gap: 8px;
`;

const ListTitle = styled.p`
  font-weight: 600;
  font-size: 12px;
  color: #737373;
  margin: 0;
`;

const RecordText = styled.p`
  font-weight: 600;
  font-size: 14px;
  color: #262627;
`;
