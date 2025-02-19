import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ContentWrapper, ItemList } from '#/components/Community/styles/common';
import Item from '#/components/Community/item';
import { useCommunityStore } from '#/context/CommunityStore';
const PopularSection: React.FC = () => {
  const { popularPosts, fetchPopularPosts, isLoading } = useCommunityStore();
  useEffect(() => {
    fetchPopularPosts();
  }, [fetchPopularPosts]);
  if (isLoading) return <div>Loading...</div>;

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
          {popularPosts.map((post, id) => (
            <Item
              key={id}
              type='popular'
              title={post.category}
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
    </Popular>
  );
};

export default PopularSection;

const Popular = styled.div``;

const PopularTitle = styled.h1`
  font-weight: 700;
  font-size: 26px;
  margin-top: 40px;
  margin-bottom: 0px;
  padding-left: 25px;
  @media (min-width: 768px) {
    padding: 0 96px;
    font-size: 36px;
  }
`;
