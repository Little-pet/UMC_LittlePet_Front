import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko'; // 한국어 지원

dayjs.extend(relativeTime);
dayjs.locale('ko');

export const getFormattedDate = (date: string | null): string => {
  if (!date) return '정보 없음'; // 날짜가 없으면 기본값 반환

  const today = dayjs(); // 현재 날짜
  const recordDate = dayjs(date); // 기록된 날짜
  const diffDays: number = today.diff(recordDate, 'day'); // 날짜 차이 계산

  if (diffDays === 0) return ' 오늘';
  if (diffDays === 1) return ' 어제';
  if (diffDays <= 30) return ` ${diffDays}일 전`; // 30일 이내는 "n일 전"

  return recordDate.format('YYYY-MM-DD'); // 30일 초과는 "YYYY-MM-DD" 형식
};
