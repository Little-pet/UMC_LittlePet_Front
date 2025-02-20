import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useHealthRecordsStore } from '#/context/useHealthRecordsStore';
import styled from 'styled-components';
import dayjs from 'dayjs';
import calendarIcon from '@assets/Calender.svg';
import MobileAddButton from '#/components/Health/RecordHealthButton/MobileAddButton';
import normal from '@assets/정상.svg';
import { usePetStore } from '#/context/petStore';
import abnormal from '@assets/이상.svg';
import axios from 'axios';
import DesktopAddButton from '#/components/Health/RecordHealthButton/DesktopAddButton';
import banner from '@assets/banner/banner-health.svg';
import DeleteModal from '#/components/DeleteModal';

// 한 주의 날짜를 가져오는 유틸리티 함수 (현재 날짜 기준 앞뒤 3일)
const getSurroundingDates = (selectedDate: dayjs.Dayjs, range: number) => {
  return Array.from({ length: range * 2 + 1 }, (_, i) =>
    selectedDate.subtract(range, 'day').add(i, 'day')
  );
};

const PastRecordPage: React.FC = () => {
  const { petId } = useParams<{ petId: string }>();
  const { recordDates, fetchRecordDates } = useHealthRecordsStore();
  const [isRecorded, setIsRecorded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { getPetName } = usePetStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  //petId에 해당하는 petName찾기
  const petName = getPetName(Number(petId));

  // 기본값 설정
  const initialDate = location.state?.selectedDate
    ? dayjs(location.state.selectedDate) // 캘린더에서 선택한 날짜
    : dayjs(); // 기본값: 오늘 날짜

  const [selectedDate, setSelectedDate] = useState(initialDate);
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
  const [recordData, setRecordData] = useState<{
    recordDate: string;
    weight: number;
    mealAmount: string;
    fecesStatus: string;
    fecesColorStatus: string;
    healthStatus: string;
    atypicalSymptom: string;
    diagnosisName: string;
    prescription: string;
    weightDifference: number;
  } | null>(null);

  //몸무게 차이
  const roundedWeightDiff =
    recordData && recordData.weightDifference !== undefined
      ? Math.round(recordData.weightDifference * 10) / 10
      : null;

  const weightChangeText =
    recordData && roundedWeightDiff
      ? recordData.weightDifference === 0
        ? '유지'
        : recordData.weightDifference > 0
          ? `${roundedWeightDiff}kg 증가`
          : `${Math.abs(roundedWeightDiff)}kg 감소`
      : '데이터 없음';

  //대변 상태 뱃지

  const fecesBadgeMap: { [key: string]: string } = {
    '적당한 무르기': normal,
  };
  const fecesStatus = recordData?.fecesStatus?.trim() || null;

  const fecesBadgeImage = fecesStatus
    ? fecesBadgeMap[fecesStatus] || abnormal
    : null;

  //petId가 바뀔 때 기록된 날짜들 가져오기
  useEffect(() => {
    if (petId) {
      fetchRecordDates(petId);
    }
  }, [petId]);

  //recordDates가 바뀔 때마다 선택한 날짜가 포함됐는지 확인
  useEffect(() => {
    setIsRecorded(recordDates.includes(selectedDate.format('YYYY-MM-DD')));
  }, [recordDates, selectedDate]);

  //selectedDate에 따른 해당 건강 기록 가져오기
  useEffect(() => {
    const fetchHealthData = async () => {
      if (!petId) {
        return;
      }
      try {
        const response = await axios.get(
          `https://umclittlepet.shop/api/pets/${petId}/health-records?localDate=${selectedDate.format(
            'YYYY-MM-DD'
          )}`,
          { withCredentials: true }
        );

        if (response.data.isSuccess && response.data.result) {
          setRecordData(response.data.result); // 응답 그대로 저장
        } else {
          setRecordData(null);
        }
      } catch (error) {
        console.error('건강 기록 불러오기 실패:', error);
        setRecordData(null);
      }
    };

    fetchHealthData();
  }, [selectedDate, petId]);

  //삭제 핸들러
  const handleDelete = async () => {
    if (!petId || !selectedDate || !isRecorded) {
      return;
    }
    try {
      const response = await axios.delete(
        `https://umclittlepet.shop/api/pets/${petId}/health-records`,
        {
          withCredentials: true,
          params: { localDate: selectedDate.format('YYYY-MM-DD') },
        }
      );
      if (response.data.isSuccess) {
        setRecordData(null);
        fetchRecordDates(petId);
        setIsRecorded(false);
        navigate('/health');
      } else {
        alert('삭제 실패! 다시 시도해주세요.');
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <ContainerWrapper>
      <Banner src={banner} />
      <Container>
        <Title>{petName}의 건강 기록</Title>
        <Line />

        <SelectedDateContainer>
          <SelectedDate>{selectedDate.format('YYYY년 MM월 DD일')}</SelectedDate>
          <WholeCalender
            onClick={() =>
              navigate(`/health/record/calendar/${petId}`, {
                state: {
                  selectedDate: selectedDate.format('YYYY-MM-DD'),
                  petName: petName,
                  petId: petId,
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
              <DayLabel>
                {date.locale('en').format('ddd').toUpperCase()}
              </DayLabel>

              <DateNumber
                isSelected={dayjs(selectedDate).isSame(date, 'day')}
                isFuture={date.isAfter(dayjs(selectedDate), 'day')}
              >
                {date.date()}
              </DateNumber>
            </DateItem>
          ))}
        </CalendarScroll>

        <HealthRecord>
          <RecordItem>
            <Label>체중</Label>
            <Value>
              {recordData?.weight !== null &&
                recordData?.weight !== undefined && (
                  <>
                    {recordData.weight}kg
                    <WeightChange>
                      지난 기록 대비 <span>{weightChangeText} </span>
                    </WeightChange>
                  </>
                )}
            </Value>
          </RecordItem>
          <RecordItem>
            <Label>식사량</Label>
            <MealValue>{recordData?.mealAmount || ''}</MealValue>
          </RecordItem>
          <RecordItem>
            {recordData?.fecesStatus || recordData?.fecesColorStatus ? ( //  데이터가 없으면 렌더링하지 않음
              <>
                <Label>대변 상태</Label>
                <Value>
                  {recordData?.fecesStatus && recordData?.fecesColorStatus
                    ? `${recordData.fecesStatus} • ${recordData.fecesColorStatus}`
                    : recordData?.fecesStatus ||
                      recordData?.fecesColorStatus ||
                      ''}

                  {/*  fecesBadgeImage가 존재할 때만 렌더링 */}
                  {fecesBadgeImage && (
                    <FecesBadge src={fecesBadgeImage} alt={fecesStatus || ''} />
                  )}
                </Value>
              </>
            ) : null}
          </RecordItem>
          <RecordItem>
            <Label>특이 증상</Label>
            <Value>{recordData?.atypicalSymptom || ''}</Value>
          </RecordItem>
          <RecordItem>
            <Label>건강 상태</Label>
            <Value>{recordData?.healthStatus || ''}</Value>
          </RecordItem>
          {
            <RecordItem>
              <Label>진료 내역</Label>
              <HospitalRecordValue>
                <RecordRow>
                  <ListTitle>진단명</ListTitle>
                  <RecordText>{recordData?.diagnosisName || '없음'}</RecordText>
                </RecordRow>
                <RecordRow>
                  <ListTitle>검사 및 처방 내역</ListTitle>
                  <RecordText>{recordData?.prescription || '없음'}</RecordText>
                </RecordRow>
              </HospitalRecordValue>
            </RecordItem>
          }
          <ButtonContainer>
            <DesktopAddButton
              selectedDate={selectedDate}
              recordData={recordData}
            />

            <DeleteButton
              onClick={() => setIsModalOpen(!isModalOpen)}
              disabled={!isRecorded}
              isDisabled={!isRecorded}
            >
              삭제하기
            </DeleteButton>
          </ButtonContainer>
        </HealthRecord>
        {isModalOpen && (
          <Overlay>
            <DeleteModal
              onClose={() => setIsModalOpen(false)}
              onDelete={handleDelete}
            />
          </Overlay>
        )}
        <MobileAddButton selectedDate={selectedDate} recordData={recordData} />
      </Container>
    </ContainerWrapper>
  );
};

export default PastRecordPage;

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
  @media only screen and (min-width: 800px) {
    padding: 0 96px;
  }
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

const DateNumber = styled.div<{ isSelected: boolean; isFuture: boolean }>`
  width: 38px;
  height: 38px;
  line-height: 38px;
  border-radius: 50%;
  background: ${({ isSelected }) => (isSelected ? '#6EA8FE' : 'transparent')};
  color: ${({ isSelected, isFuture }) =>
    isSelected ? '#fff' : isFuture ? '#6a6a6d' : '#D5D5D6'};
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

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const DeleteButton = styled.button<{ isDisabled: boolean }>`
  background-color: ${({ isDisabled }) => (isDisabled ? '#E6E6E6' : '#C76B6B')};
  color: white;
  height: 48px;
  font-family: 'Pretendard';
  font-weight: 600;
  padding: 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
  width: 100%;
  @media only screen and (min-width: 800px) {
    width: 197px;
  }
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
