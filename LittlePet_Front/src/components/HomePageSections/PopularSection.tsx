import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ContentWrapper } from '#/components/Community/styles/common';
import Item from '#/components/Community/item';
import { useCommunityStore } from '#/context/CommunityStore';
import ChallengeItem from '#/components/Community/challengeItem';
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
        <MobileItemList>
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
        </MobileItemList>
        <PcItemList>
          {popularPosts.map((post, id) => (
            <ChallengeItem
              key={id}
              type='challenge'
              title={post.title}
              name={post.userName}
              postId={post.postId}
              views={post.views}
              likes={post.likes}
              comments={post.comments}
              contents={post.contents}
              category='챌린지'
            />
          ))}
        </PcItemList>
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

export const MobileItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  overflow-y: auto; /* 세로 스크롤 */
  ::-webkit-scrollbar {
    display: none;
  }
    /* 크롬, 사파리, 오페라, 엣지에서 스크롤바 숨기기 */
  ::-webkit-scrollbar {
    display: none;
  }

  /* 인터넷 익스플로러에서 스크롤바 숨기기 */
  -ms-overflow-style: none; 

  /* 파이어폭스에서 스크롤바 숨기기 */
  scrollbar-width: none; 
   @media (min-width: 800px) {
    display: none;
  }
}
`;
const PcItemList = styled.div`
  display: grid;
  gap: 15px;
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  //justify-content: space-between;
  padding: 0 96px;
  flex-wrap: wrap;
  @media (max-width: 800px) {
    display: none;
  }
`;
