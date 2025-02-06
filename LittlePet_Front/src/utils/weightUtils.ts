export const getWeightChangeText = (
  latestWeight: number | null,
  previousWeight: number | null
): string => {
  if (latestWeight === null || previousWeight === null) {
    console.warn(
      ' 데이터 없음 반환됨! latestWeight 또는 previousWeight가 null'
    );
    return '데이터 없음';
  }

  const difference = Math.round((latestWeight - previousWeight) * 100) / 100;

  if (difference === 0) return '유지';
  if (difference > 0) return `${difference}kg 증가`;

  return `${Math.abs(difference)}kg 감소`;
};
