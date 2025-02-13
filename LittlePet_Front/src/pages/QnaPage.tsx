import SearchBar from '@components/SearchBar';
import Item from '#/components/Community/Item';
import MobileAddButton from '#/components/Community/AddButton/MobileAddButton';
import DesktopAddButton from '#/components/Community/AddButton/DesktopAddButton';
import banner from '#/assets/banner/큐앤에이 배너.svg';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  ContentWrapper,
  Header,
  HeaderFilter,
  ItemList,
} from '#/components/Community/styles/common';
const QnaPage: React.FC = () => {
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
          `https://umclittlepet.shop/api/post?category=Q%26A&pageNum=0&size=10&sort=${sortParam}deviceType=pc`,
          { withCredentials: true }
        );
        console.log('Q&A 글 목록 조회 성공', response.data);
        setPosts(response.data.result);
      } catch (error) {
        console.error('Q&A 글 목록 조회 실패:', error);
      }
    };

    fetchPosts(); // 함수를 정의한 후 바로 호출합니다.
  }, []);

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
          {posts.map((post, id) => (
            <Item
              title='Q&A'
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
