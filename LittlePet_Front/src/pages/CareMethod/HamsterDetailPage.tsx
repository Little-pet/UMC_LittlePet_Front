import React from 'react';
import { useOutletContext } from 'react-router-dom';
import styled from 'styled-components';
import hamham from '@assets/hamham.jpg';

const HamsterDetailPage: React.FC = () => {
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
      <TitleContainer>
        <Title>골든 햄스터는 정.말.귀.엽.습.니.다.</Title>
        <Date>2024.12.23 12:52 </Date>
        <HamsterImg src={hamham} alt='햄스터' />
      </TitleContainer>

      <Content>
        <Section>
          <SectionTitle ref={featureRef}>특징</SectionTitle>
          <hr />
          <p>
            햄스터는 외모가 귀여울 뿐만 아니라, 성격도 매우 호기심 많고 활발한
            동물입니다. 이들의 특성을 이해하고, 적절한 대처를 해주면 더욱 행복한
            반려 생활을 할 수 있어요. <br />
            <br />
            우선, 햄스터는 매우 독립적인 성격을 가지고 있어 혼자 있는 시간을
            좋아합니다. 사람과 함께 놀기를 좋아하기보다는 혼자 활동하는 것을
            선호하기에, 햄스터가 혼자 시간을 보낼 수 있도록 배려해 주세요.{' '}
            <br />
            <br />
            또한, 햄스터는 밤에 가장 활발하게 활동하는 야행성 동물입니다. 그래서
            낮에는 대부분 잠을 자고, 저녁이 되면 활동을 시작해요. 저녁 시간에
            운동기구나 터널을 제공해 주면 햄스터가 스트레스를 풀며 건강하게 지낼
            수 있어요. <br />
            <br />
            마지막으로, 햄스터는 음식을 저장하는 귀여운 습관이 있습니다. 뺨에
            음식을 가득 채워 놓고 자주 숨겨두는 모습을 볼 수 있어요. 이 모습은
            햄스터의 본능 중 하나로, 먹이를 모으는 습성이기에 자연스러운
            행동입니다.
          </p>
        </Section>

        <Section>
          <SectionTitle ref={foodRef}>먹이</SectionTitle>
          <hr />
          <p>
            가장 기본이 되는 먹이는 햄스터 전용 사료입니다. 일반적으로
            고단백질과 고지방이 적당히 석인 사료를 주는 거시 좋습니다. 이 사료는
            햄스터에게 필요한 영양소를 골고루 제공하며, 건강한 성장과 활발한
            활동을 지원합니다. 하루에 한 번 정해진 시간에 정해진 양을 주고, 남은
            음식은 바로 제거해 주세요. 음식물이 오래 남아 있으면 곰팡이가
            생기거나 악취가 날 수 있어요. 햄스터는 신선한 채소와 과일도
            좋아하지만, 과일은 당분이 많으므로 과일의 양은 적당히 조절해야
            합니다. 채소로는 당근, 상추, 오이, 브로콜리 등이 있으며, 과일로는
            사과, 배, 포도 등이 있습니다. 상추는 지나치게 많은 양을 주면 설사를
            유발하므로 주의해 주세요. <br />
            <br />
            항상 깨끗한 물을 제공해 주세요. 햄스터는 하루에 5~10ml 정도의 물을
            마시며, 물통은 하루에 한 번 청소해주어야 해요. 물통에 물이 남지
            않도록 점검하는 것도 중요한 관리 포인트입니다.
          </p>
        </Section>

        <Section>
          <SectionTitle ref={environmentRef}>환경</SectionTitle>
          <hr />
          <p>
            햄스터는 작은 공간에서도 잘 지내지만, 활동량이 많아 스트레스를 받지
            않도록 충분히 활동할 수 있는 환경을 만들어 주는 것이 중요합니다.
            햄스터의 우리는 적당히 넓어야 하며, 금속 재질보다는 플라스틱이나
            아크릴로 된 안전한 재질의 우리를 선택하세요. 바닥은 부드러운 침구로
            채워주되, 나무칩이나 종이 기반의 침구가 좋습니다.
            <br />
            햄스터는 온도에 민감한 동물입니다. 햄스터의 적정 온도는 18~24도
            정도이며, 직사광선은 피해야 합니다. 햄스터는 여름에 더위에 약하고,
            겨울에는 추위에 약하므로 온도를 일정하게 유지해 주세요.
          </p>
        </Section>

        <Section>
          <SectionTitle ref={playRef}>놀이방법</SectionTitle>
          <hr />
          <p>
            햄스터는 매우 활발하고 호기심 많은 동물이기 때문에 다양한 놀이와
            운동을 통해 건강하게 키울 수 있어요. 햄스터는 혼자 놀 때도 즐겁지만,
            사람과 함께 놀 때 더 재미있어 합니다. <br />
            <br />
            1) 터널과 미로 : 햄스터는 좁은 공간을 좋아하기 때문에, 다양한 터널과
            미로를 만들어 주면 재미있게 놀 수 있습니다. 다양한 길이와 모양의
            터널을 집 안에 배치하고 햄스터가 이를 탐험할 수 있게 해 주세요.
            터널은 햄스터의 본능적인 탐색 욕구를 충족시켜 주고, 신체 활동을
            도와줍니다.
            <br />
            <br /> 2) 쥐놀이볼: 운동볼을 이용해 햄스터를 집 밖에서 운동시킬 수
            있습니다. 놀이볼에 햄스터를 넣고 집 주변을 돌아다니게 하면 운동이
            되며, 스트레스를 풀어주는 데에도 도움이 돼요. 이때 볼이 너무 크지
            않도록 주의하고, 햄스터가 공포감을 느끼지 않도록 서서히 적응시켜
            주세요. <br />
            <br />
            3) 간식 숨기기: 햄스터는 음식을 숨겨 놓고 찾는 것을 좋아합니다.
            간식을 숨겨 놓고 찾아보게 하면서 호기심을 자극하고, 정신적 자극을 줄
            수 있어요.
          </p>
        </Section>
      </Content>
    </Container>
  );
};

export default HamsterDetailPage;

// 🟢 Styled Components
const Container = styled.div`
  max-width: 600px;
  margin: auto;
  padding: 20px;
`;

const TitleContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 8px;
  font-family: 'Pretendard';
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  height: 22px;
`;

const Date = styled.div`
  height: 22px;
  font-weight: 500;
  font-size: 12px;
  color: #737373;
`;

const HamsterImg = styled.img`
  width: 100%;
  border-radius: 5px;
`;
const Content = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  hr {
    border: none;
    height: 1px;
    background-color: #e6e6e6;
    width: 100%;
    margin: 0;
  }
  p {
    margin: 0;
    font-weight: 500;
    font-size: 12px;
    line-height: 18px;
    color: #262627cc;
  }
`;

const SectionTitle = styled.h2`
  color: #262627cc;
  height: 18px;
  font-weight: 600;
  font-size: 16px;
  margin: 0;
  scroll-margin-top: 150px;
`;
