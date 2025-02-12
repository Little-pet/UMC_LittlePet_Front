import React from 'react';
import styled from 'styled-components';

// 타입 정의
interface StatItemProps {
  label: string;
  value: number;
}

interface UserActivity {
  likes: number;
  posts: number;
  comments: number;
  scrape: number;
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
    { label: '글', value: user.posts },
    { label: '댓글', value: user.comments },
    { label: '좋아요', value: user.likes },
    { label: '병원 리뷰', value: 0 },
    { label: '스크랩', value: user.scrape },
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
  justify-content: space-between;
  align-items: center;
  border: 1px solid#E6E6E6;
  border-radius: 5px;
  padding: 15px 6px;
  width: 343px;
  gap: 10px;
  height: 81px;
  box-sizing: border-box;
  z-index: 0;
`;
const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
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
`;
const Value = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #6ea8fe;
  cursor: pointer;
  height: 22px;
`;
