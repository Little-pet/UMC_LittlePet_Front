import SearchBar from '#/components/searchBar';
import Item from '#/components/Community/item';
import MobileAddButton from '#/components/Community/AddButton/MobileAddButton';
import React, { useState, useEffect, useRef } from 'react';
import DesktopAddButton from '#/components/Community/AddButton/DesktopAddButton';
import banner from '#/assets/banner/일상 배너.svg';
import styled from 'styled-components';
import { useCategoryPosts } from '#/hooks/useCategoryPosts';
import CommunityPost from '#/components/SkeletonUI/CommunityPost';
import {
  Container,
  ContentWrapper,
  Header,
  HeaderFilter,
  ItemList,
} from '#/components/Community/styles/common';
const DailyPage: React.FC = () => {
  const [selected, setSelected] = useState<'인기순' | '최신순'>('최신순');
  const handleClick = (filter: '인기순' | '최신순') => {
    setSelected(filter);
  };

  const { data, fetchNextPage, hasNextPage, isLoading } = useCategoryPosts(
    '일상',
    selected
  );
  const observerRef = useRef(null);

  useEffect(() => {
    if (observerRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage) {
            console.log(' [IntersectionObserver] fetchNextPage 실행!');
            fetchNextPage();
          }
        },
        { threshold: 1 }
      );
      observer.observe(observerRef.current);
      return () => observer.disconnect();
    }
  }, [hasNextPage, fetchNextPage]);

  if (isLoading) return <CommunityPost banner={banner} />;

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
          {data?.pages
            .flatMap((page) => page.posts)
            .map((post, id) => (
              <Item
                key={id}
                title='일상'
                type='daily'
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
