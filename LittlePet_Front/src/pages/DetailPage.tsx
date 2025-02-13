import React from 'react';
import { useParams } from 'react-router-dom';
import PostContent from '#/components/Community/Post/postContent';
import Comment from '#/components/Community/Post/comment';
import styled from 'styled-components';
import Reply from '#/components/Community/Post/reply';
import CommentWriteBox from '#/components/Community/Post/commentWriteBox';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const DetailPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      const response = await axios.get(
        `https://umclittlepet.shop/api/post/${postId}?deviceType=pc`,
        { withCredentials: true }
      );

      const data = response.data;
      if (data.isSuccess) {
        console.log('커뮤니티 특정 글 조회 성공', data);
        const result = data.result;
      }
      return data.result;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>데이터를 불러오는 중 오류 발생</div>;

  return (
    <Container>
      <PostContent
        title={data.postTitle}
        author={data.userName}
        badgeType={data.userBadges}
        animal={data.petCategory}
        gender='male'
        time={data.updatedTime}
        footerData={[data.views, data.likes, data.commentNum]}
        contents={data.contents}
        likeCount={data.likes}
      />
      <CommentHeader>
        <Title>전체 댓글&nbsp;</Title>
        <Count>{`[${data.commentNum}]`}</Count>
      </CommentHeader>
      <CommentList>
        {data.comments.map((comment, idx) => (
          <React.Fragment key={idx}>
            <Comment
              userName={comment.name}
              animal={comment.userPets[0]}
              gender='male'
              content={comment.content}
              time={comment.updatedTime}
            />
            {comment.replies.length > 0 &&
              comment.replies.map((reply, replyIdx) => (
                <Reply
                  key={replyIdx}
                  userName={reply.name}
                  animal={reply.userPets[0]}
                  gender='female'
                  content={reply.content}
                  time={reply.createdTime}
                />
              ))}
          </React.Fragment>
        ))}
      </CommentList>
      <CommentHeader>
        <Title>댓글 쓰기</Title>
      </CommentHeader>
      <CommentWriteBox
        author={data.userName}
        animal={data.petCategory}
        gender='female'
      />
    </Container>
  );
};
export default DetailPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto; /* 세로 스크롤 */
  /* 크롬, 사파리, 오페라, 엣지에서 스크롤바 숨기기 */
  ::-webkit-scrollbar {
    display: none;
  }

  /* 인터넷 익스플로러에서 스크롤바 숨기기 */
  -ms-overflow-style: none;

  /* 파이어폭스에서 스크롤바 숨기기 */
  scrollbar-width: none;
`;
const CommentList = styled.div``;

const CommentHeader = styled.div`
  height: 44px;
  border-top: 3px solid #e9e9e9;
  border-bottom: 3px solid #e9e9e9;
  box-sizing: border-box;
  display: flex;
  padding: 8px 25px;
  align-items: center;
  @media only screen and (min-width: 800px) {
    margin: 0 96px;
  }
`;

const Title = styled.div`
  font-size: 14px;
  font-family: 'Pretendard-SemiBold';
`;

const Count = styled.div`
  font-size: 14px;
  font-family: 'Pretendard-SemiBold';
  color: #6ea8fe;
`;
