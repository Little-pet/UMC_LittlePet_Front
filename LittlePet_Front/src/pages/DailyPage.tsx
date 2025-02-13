import SearchBar from '#/components/SearchBar';
import Item from '#/components/Community/Item';
import 고슴도치 from '#/assets/고슴도치.png';
import MobileAddButton from '#/components/Community/AddButton/MobileAddButton';
import React, { useState, useEffect } from 'react';
import DesktopAddButton from '#/components/Community/AddButton/DesktopAddButton';
import banner from '#/assets/banner/일상 배너.svg';
import styled from 'styled-components';
import axios from 'axios';
import {
  Container,
  ContentWrapper,
  Header,
  HeaderFilter,
  ItemList,
} from '#/components/Community/styles/common';
const DailyPage: React.FC = () => {
  const [selected, setSelected] = useState<'popular' | 'new'>('popular');
  const [posts, setPosts] = useState([]);
  const handleClick = (filter: 'popular' | 'new') => {
    setSelected(filter);
  };
  const current = '%EC%B5%9C%EC%8B%A0%EC%88%9C';
  const popular = '%EC%9D%B8%EA%B8%B0%EC%88%9C';
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const sortParam = selected === 'popular' ? popular : current;
        const response = await axios.get(
          `https://umclittlepet.shop/api/post?category=%EC%9D%BC%EC%83%81&pageNum=0&size=10&sort=${sortParam}&deviceType=pc`,
          { withCredentials: true }
        );
        console.log('일상 글 목록 조회 성공', response.data);
        setPosts(response.data.result);
      } catch (error) {
        console.error('일상 글 목록 조회 실패:', error);
      }
    };

    fetchPosts(); // 함수를 정의한 후 바로 호출합니다.
  }, []);
  return (
    <Container>
      <Banner src={banner} />
      <SearchBarContainer>
        <SearchBar placeholder='일상에서 검색' />
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
          {posts.map((post, id) => (
            <Item
              title='일상'
              postId={post.id}
              subText={post.petCategory}
              description={post.title}
              contents={post.contents}
              footerData={[
                post.userName,
                post.createdTime.substring(5, 10),
                post.views,
                post.likes,
                post.comments,
              ]}
            />
          ))}
        </ItemList>
      </ContentWrapper>
      <MobileAddButton />
    </Container>
  );
};
export default DailyPage;
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
