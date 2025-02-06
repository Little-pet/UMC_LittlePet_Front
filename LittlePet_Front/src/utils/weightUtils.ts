export const getWeightChangeText = (
  latestWeight: number | null,
  previousWeight: number | null
): string => {
  if (latestWeight === null || previousWeight === null) return '데이터 없음';

  const difference = latestWeight - previousWeight; // 몸무게 변화량 계산

  if (difference === 0) return '지난 기록 대비 유지';
  if (difference > 0) return `지난 기록 대비 ${difference}g 증가`;
  return `지난 기록 대비 ${Math.abs(difference)}g 감소`; // 절대값으로 표시
};
