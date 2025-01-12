import SearchBar from '#/components/searchBar';
import Item from '#/components/item';
import 고슴도치 from '#/assets/고슴도치.png';
import AddButton from '#/components/addButton';
import {
  Container,
  ContentWrapper,
  Header,
  HeaderTitle,
  HeaderLink,
  ItemList,
} from '#/components/styles/common';

const PopularPage = () => {
  return (
    <Container>
      <SearchBar text='전체 검색' />
      <ContentWrapper>
        <Header>
          <HeaderTitle>인기글</HeaderTitle>
          <HeaderLink to='/community/popular/total'>전체보기</HeaderLink>
        </Header>
        <ItemList>
          <Item
            title='Q&A'
            postId='1'
            subText='토끼'
            description='토끼가 어느 순간부터 사료를 먹지 않아요...'
            content='원래 매우 잘 먹던 아이가 한 일주일 정도 지났나.. 사료를 안 먹네요.이렇게 두다가는 굶을까봐 간식을 줬는데 간식은 또 잘 먹더라구요...'
            footerData={['천혜향', '12.23', '919', '11', '29']}
          />

          <Item
            title='일상'
            postId='2'
            subText='고슴도치'
            description='저희 고슴도치가 새끼를 낳았어요!'
            content='새끼때부터 키우던게 엊그제 같은데 벌써 이렇게나세 쌍둥이를 낳았어요! 이름은 뭐로 할지 고민이...'
            footerData={['감초', '12.25', '896', '8', '17']}
            img={고슴도치}
          />
        </ItemList>
      </ContentWrapper>
      <AddButton />
    </Container>
  );
};

export default PopularPage;
