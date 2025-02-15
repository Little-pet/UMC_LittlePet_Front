import SearchBar from '#/components/searchBar';
import Item from '#/components/Community/item';
import 고슴도치 from '#/assets/고슴도치.png';
import MobileAddButton from '#/components/Community/AddButton/MobileAddButton';
import DesktopAddButton from '#/components/Community/AddButton/DesktopAddButton';
import banner from '#/assets/banner/큐앤에이 배너.svg';
import styled from 'styled-components';
import React, { useState } from 'react';
import {
  Container,
  ContentWrapper,
  Header,
  HeaderFilter,
  ItemList,
} from '#/components/Community/styles/common';
const QnaPage: React.FC = () => {
  const [selected, setSelected] = useState<'popular' | 'new'>('popular');
  const handleClick = (filter: 'popular' | 'new') => {
    setSelected(filter);
  };
  return (
    <Container>
      <Banner src={banner} />
      <SearchBarContainer>
        <SearchBar placeholder='Q&A에서 검색' />
      </SearchBarContainer>
      <ContentWrapper>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingRight: '96px',
          }}
        >
          <Header>
            <HeaderFilter
              onClick={() => handleClick('popular')}
              isActive={selected === 'popular'}
            >
              인기순
            </HeaderFilter>
            <HeaderFilter
              onClick={() => handleClick('new')}
              isActive={selected === 'new'}
            >
              최신순
            </HeaderFilter>
          </Header>
          <DesktopAddButton />
        </div>
        <ItemList>
          <Item
            title='Q&A'
            postId='3'
            subText='토끼'
            description='토끼가 어느 순간부터 사료를 먹지 않아요...'
            content='원래 매우 잘 먹던 아이가 한 일주일 정도 지났나.. 사료를 안 먹네요.이렇게 두다가는 굶을까봐 간식을 줬는데 간식은 또 잘 먹더라구요...'
            footerData={['천혜향', '12.23', '919', '11', '29']}
          />

          <Item
            title='일상'
            postId='4'
            subText='고슴도치'
            description='저희 고슴도치가 새끼를 낳았어요!'
            content='새끼때부터 키우던게 엊그제 같은데 벌써 이렇게나세 쌍둥이를 낳았어요! 이름은 뭐로 할지 고민이...'
            footerData={['감초', '12.25', '896', '8', '17']}
            img={고슴도치}
          />
          <Item
            title='일상'
            postId='4'
            subText='고슴도치'
            description='저희 고슴도치가 새끼를 낳았어요!'
            content='새끼때부터 키우던게 엊그제 같은데 벌써 이렇게나세 쌍둥이를 낳았어요! 이름은 뭐로 할지 고민이...'
            footerData={['감초', '12.25', '896', '8', '17']}
            img={고슴도치}
          />
          <Item
            title='일상'
            postId='4'
            subText='고슴도치'
            description='저희 고슴도치가 새끼를 낳았어요!'
            content='새끼때부터 키우던게 엊그제 같은데 벌써 이렇게나세 쌍둥이를 낳았어요! 이름은 뭐로 할지 고민이...'
            footerData={['감초', '12.25', '896', '8', '17']}
            img={고슴도치}
          />
        </ItemList>
      </ContentWrapper>
      <MobileAddButton />
    </Container>
  );
};
export default QnaPage;
const Banner = styled.img`
  width: 100%;
  @media (max-width: 800px) {
    display: none;
  }
`;
const SearchBarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
