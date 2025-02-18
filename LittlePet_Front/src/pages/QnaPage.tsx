import SearchBar from '@components/searchBar';
import Item from '#/components/Community/item';
import MobileAddButton from '#/components/Community/AddButton/MobileAddButton';
import DesktopAddButton from '#/components/Community/AddButton/DesktopAddButton';
import banner from '#/assets/banner/큐앤에이 배너.svg';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
//import { useQuery } from '@tanstack/react-query';
import { useCommunityStore } from '#/context/CommunityStore';
import CommunityPost from '#/components/SkeletonUI/CommunityPost';
import {
  Container,
  ContentWrapper,
  Header,
  HeaderFilter,
  ItemList,
} from '#/components/Community/styles/common';
const QnaPage: React.FC = () => {
  const [selected, setSelected] = useState<'인기순' | '최신순'>('최신순');
  const handleClick = (filter: '인기순' | '최신순') => {
    setSelected(filter);
  };
  const { posts, fetchPosts, isLoading } = useCommunityStore();
  useEffect(() => {
    fetchPosts('Q&A', selected);
  }, [fetchPosts, selected]);

  if (isLoading) return <CommunityPost />;
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
              onClick={() => handleClick('최신순')}
              isActive={selected === '최신순'}
            >
              최신순
            </HeaderFilter>
            <HeaderFilter
              onClick={() => handleClick('인기순')}
              isActive={selected === '인기순'}
            >
              인기순
            </HeaderFilter>
          </Header>
          <DesktopAddButton />
        </div>
        <ItemList>
          {posts.map((post, id) => (
            <Item
              key={id}
              title='Q&A'
              type='qna'
              postId={post.postId}
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
