import React from 'react';
import styled from 'styled-components';
import { ContentWrapper, ItemList } from '#/components/Community/styles/common';
import Item from '#/components/Community/Item';
import HedgeHog from '#/assets/고슴도치.png';

const PopularSection: React.FC = () => {
  return (
    <Popular>
      <PopularTitle>인기글 🔥</PopularTitle>
      <ContentWrapper>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingRight: '96px',
            marginTop: 0,
          }}
        ></div>
        <ItemList>
          <Item
            title='Q&A'
            postId='5'
            subText='토끼'
            description='토끼가 어느 순간부터 사료를 먹지 않아요...'
            content='원래 매우 잘 먹던 아이가 한 일주일 정도 지났나.. 사료를 안 먹네요.이렇게 두다가는 굶을까봐 간식을 줬는데 간식은 또 잘 먹더라구요...'
            footerData={['천혜향', '12.23', '919', '11', '29']}
          />

          <Item
            title='일상'
            postId='6'
            subText='고슴도치'
            description='저희 고슴도치가 새끼를 낳았어요!'
            content='새끼때부터 키우던게 엊그제 같은데 벌써 이렇게나세 쌍둥이를 낳았어요! 이름은 뭐로 할지 고민이...'
            footerData={['감초', '12.25', '896', '8', '17']}
            img={HedgeHog}
          />
        </ItemList>
      </ContentWrapper>
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
  padding-left: 25px;
  @media (min-width: 768px) {
    padding: 0 96px;
    font-size: 36px;
  }
`;
