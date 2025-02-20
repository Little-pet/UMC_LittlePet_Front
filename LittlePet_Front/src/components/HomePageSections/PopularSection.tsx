import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ContentWrapper } from '#/components/Community/styles/common';
import Item from '#/components/Community/item';
import { usePopularPosts } from '#/hooks/usePopularPosts';
import ChallengeItem from '#/components/Community/challengeItem';
const PopularSection: React.FC = () => {
  const isPC = window.innerWidth >= 800;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePopularPosts('popular');
  const popularPosts = data?.pages.flatMap((page: any) => page.posts) || [];

  const observerRef = useRef(null);
  //모바일에선 무한스크롤 감지
  useEffect(() => {
    if (!isPC && observerRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            fetchNextPage();
          }
        },
        { threshold: 1 }
      );
      observer.observe(observerRef.current);
      return () => observer.disconnect();
    }
  }, [isPC, hasNextPage, fetchNextPage]);

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

      <ButtonContainer>
        {/* PC는 "더보기" 버튼으로 페이징 */}
        {isPC && hasNextPage && (
          <MoreButton
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            더보기
          </MoreButton>
        )}
      </ButtonContainer>

      {/*  모바일에서는 Intersection Observer로 무한스크롤 */}
      {!isPC && <ObserverDiv ref={observerRef} />}
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
  @media (min-width: 800px) {
    padding: 0 96px;
    font-size: 36px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const MoreButton = styled.button`
  background-color: #6ea8fe;
  box-shadow: 0px 4px 5px 0px #00000026;
  width: 268px;
  height: 68px;
  border-radius: 50px;

  box-sizing: border-box;
  font-size: 26px;
  font-weight: 600;
  display: flex;
  line-height: 35px;
  justify-content: center;
  align-items: center;
  color: #fff;
  margin-top: 50px;
  border: none;
  white-space: no-wrap;
`;

const ObserverDiv = styled.div`
  height: 20px;
  width: 100%;
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
