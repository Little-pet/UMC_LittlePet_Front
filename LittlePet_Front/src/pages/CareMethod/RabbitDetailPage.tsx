import React from 'react';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import hamster from '@assets/animals/햄스터.svg';

const RabbitDetailPage: React.FC = () => {
  // 🟢 `CareDetailRootLayout`에서 전달받은 ref 가져오기
  const { featureRef, foodRef, environmentRef, playRef } = useOutletContext<{
    featureRef: React.RefObject<HTMLDivElement>;
    foodRef: React.RefObject<HTMLDivElement>;
    environmentRef: React.RefObject<HTMLDivElement>;
    playRef: React.RefObject<HTMLDivElement>;
  }>();

  return (
    <Container>
      {/* 🟢 페이지 콘텐츠 */}
      <Content>
        <Section ref={featureRef}>
          <h2>특징</h2>
          <p>
            햄스터는 외모가 귀여울 뿐만 아니라, 성격도 매우 호기심 많고 활발한
            동물입니다...
          </p>
          <img src={hamster} alt='햄스터' />
        </Section>

        <Section ref={foodRef}>
          <h2>먹이</h2>
          <p>
            햄스터는 씨앗, 곡물, 과일 등을 주식으로 먹으며, 균형 잡힌 식단이
            중요합니다...
          </p>
        </Section>

        <Section ref={environmentRef}>
          <h2>환경</h2>
          <p>
            햄스터는 넓은 케이지와 적절한 온도 및 습도가 유지되는 환경에서
            건강하게 생활할 수 있습니다...
          </p>
        </Section>

        <Section ref={playRef}>
          <h2>놀이방법</h2>
          <p>
            햄스터는 터널을 좋아하며, 바퀴 돌리기와 같은 활동적인 놀이를
            즐깁니다...
          </p>
        </Section>
      </Content>
    </Container>
  );
};

export default RabbitDetailPage;

// 🟢 Styled Components
const Container = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
`;

const Content = styled.div`
  margin-top: 20px;
`;

const Section = styled.div`
  padding: 50px 0;
  border-bottom: 1px solid #ddd;
  h2 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  img {
    width: 100%;
    border-radius: 10px;
    margin-top: 10px;
  }
`;
