import React from 'react';
import styled from 'styled-components';

const MyPage: React.FC = () => {
  return (
    <Container>
      <Title>마이페이지</Title>
    </Container>
  );
};

export default MyPage;

const Container = styled.div`
  margin: 41px 25px;
`;

const Title = styled.p`
  text-align: center;
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 22px;
`;
