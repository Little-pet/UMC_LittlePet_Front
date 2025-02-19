import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { format } from 'date-fns';
import { ko as koLocale } from 'date-fns/locale';
import CalendarIconSrc from '../assets/Calender.svg'; // 이미지 경로 확인 필요

// DatePicker 컴포넌트 props 타입 정의
interface CustomDatePickerProps {
  selectedDate: string; // yyyy.MM.dd 형식의 문자열
  onDateChange: (date: string) => void;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  selectedDate,
  onDateChange,
}) => {
  // 문자열을 Date 객체로 변환
  const parsedDate = selectedDate
    ? new Date(selectedDate.replace(/\./g, '-')) // "yyyy.MM.dd" -> "yyyy-MM-dd"
    : new Date();

  // 날짜 변경 핸들러 (배열 체크 추가)
  const handleDateChange = (date: Date | Date[] | null) => {
    if (date && !Array.isArray(date)) {
      const formattedDate = format(date, 'yyyy.MM.dd (EEE)', {
        locale: koLocale,
      });
      onDateChange(formattedDate); // 부모 컴포넌트로 업데이트 전달
    }
  };

  return (
    <DateContainer>
      <StyledDatePicker
        selected={parsedDate}
        onChange={handleDateChange}
        dateFormat={'yyyy.MM.dd (EEE)'} //  문자열로 명확하게 지정
        locale={koLocale} //  locale을 명확하게 설정
      />
      <CalendarIconWrapper>
        <CalendarIcon src={CalendarIconSrc} alt='달력 아이콘' />
      </CalendarIconWrapper>
    </DateContainer>
  );
};

export default CustomDatePicker;

// 스타일 정의

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  width: 343px;
  height: 48px;
  border: 1px solid #737373;
  border-radius: 5px;
  font-family: 'Pretendard';
  box-sizing: border-box;
  color: #737373;
`;

const StyledDatePicker = styled(DatePicker)`
  flex: 1; /* 내부 요소가 가득 차도록 */
  font-size: 14px;
  padding: 10px 15px; /* 좌측 여백 유지 */
  border: none;
  outline: none;
  color: #737373;

  /* 기본 캘린더 아이콘 숨기기 */
  &::-webkit-calendar-picker-indicator {
    opacity: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;

const CalendarIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 15px; /* 아이콘 우측 여백 */
  margin-left: auto;
`;

const CalendarIcon = styled.img`
  width: 18px;
  pointer-events: none; /* 아이콘 클릭 방지 */
`;
