import styled from 'styled-components';
import React from 'react';

interface BadgeComponentProps {
  type: 'challenge' | 'popular'; // type은 'challenge' 또는 'popular' 중 하나
}
// Styled-components의 props 타입 정의
interface BadgeProps {
  type: 'challenge' | 'popular';
}
// 커뮤니티 업적 뱃지
const BadgeComponent: React.FC<BadgeComponentProps> = ({ type }) => {
  return (
    <Badge type={type}>
      <BadgeText type={type}>
        {type === 'challenge' ? '챌린지왕' : '인기스타'}
      </BadgeText>
    </Badge>
  );
};
export default BadgeComponent;
const Badge = styled.div<BadgeProps>`
  width: 44px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-radius: 15px;
  border: ${(props) =>
    props.type === 'challenge' ? '1px solid #854D0E' : '1px solid #9E2D2D'};
  background-color: ${(props) =>
    props.type === 'challenge' ? '#FEF9C3' : '#FEDCDC'};
`;

const BadgeText = styled.p<BadgeProps>`
  color: ${(props) => (props.type === 'challenge' ? '#854D0E' : '#9E2D2D')};
  font-size: 8px;
  font-family: 'Pretendard-SemiBold';
`;
