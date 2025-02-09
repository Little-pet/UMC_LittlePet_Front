import React from 'react';
import styled from 'styled-components';

// 타입 정의
interface StatItemProps {
  label: string;
  value: number;
}

interface UserActivity {
  likeCount: number;
  postCount: number;
  commentCount: number;
  scrapCount: number;
  reviewCount: number;
}

interface StatsProps {
  user: UserActivity;
}

// 개별 항목 컴포넌트
const StatItem: React.FC<StatItemProps> = ({ label, value }) => {
  return (
    <ItemContainer>
      <Label>{label}</Label>
      <Value>{value}</Value>
    </ItemContainer>
  );
};

const StatsComponent: React.FC<StatsProps> = ({ user }) => {
  // user 데이터를 활용하여 statsData 구성
  const statsData = [
    { label: '글', value: user.postCount },
    { label: '댓글', value: user.commentCount },
    { label: '좋아요', value: user.likeCount },
    { label: '병원 리뷰', value: user.reviewCount },
    { label: '스크랩', value: user.scrapCount },
  ];

  return (
    <StatsContainer>
      {statsData.map((stat, index) => (
        <StatItem key={index} label={stat.label} value={stat.value} />
      ))}
    </StatsContainer>
  );
};

export default StatsComponent;

// 스타일 컴포넌트 정의
const StatsContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid#E6E6E6;
  border-radius: 5px;
  padding: 15px 6px;
  width: 100%;
  height: 81px;
  box-sizing: border-box;
  z-index: 0;
`;
const ItemContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative; /* 가상 요소의 위치 조정을 위해 필요 */
  padding: 0 15px;

  &:not(:last-child)::after {
    content: '';
    position: absolute;
    right: 0; /* 패딩 끝 위치에 선 추가 */
    top: 45%;
    height: 35%;
    transform: translateY(-50%); /* 수직 중앙 정렬 */
    width: 1px;
    background-color: #e6e6e6;
  }
`;
const Label = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #737373;
  align-items: center;
  height: 22px;
  white-space: nowrap; // 줄바꿈 금지
`;
const Value = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #6ea8fe;
  cursor: pointer;
  height: 22px;
  white-space: nowrap; // 줄바꿈 금지
`;
