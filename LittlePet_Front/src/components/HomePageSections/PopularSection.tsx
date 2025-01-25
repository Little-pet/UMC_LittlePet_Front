import React from 'react';
import styled from 'styled-components';

const PopularSection: React.FC = () => {
  return (
    <Popular>
      <PopularTitle>인기글 🔥</PopularTitle>
      {/* 무한 스크롤 구현 */}
    </Popular>
  );
};

export default PopularSection;

const Popular = styled.div``;

const PopularTitle = styled.h1`
  font-weight: 700;
  font-size: 26px;
  margin-top: 44px;
  margin-bottom: 34px;
`;
