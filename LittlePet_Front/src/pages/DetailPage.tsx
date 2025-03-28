import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import PostContent from '#/components/Community/Post/postContent';
import Comment from '#/components/Community/Post/comment';
import styled from 'styled-components';
import Reply from '#/components/Community/Post/reply';
import CommentWriteBox from '#/components/Community/Post/commentWriteBox';
import { CommentType, useCommunityStore } from '#/store/CommunityStore';
import CommunityDetail from '#/components/SkeletonUI/CommunityDetail';
import { useAuthStore } from '#/store/AuthStore';
import { useQuery } from '@tanstack/react-query';

const DetailPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const numericPostId = Number(postId);
  const { fetchPost, patchViews } = useCommunityStore();
  const { state } = useLocation();
  const { category, type } = state || {};
  const [openCommentId, setOpenCommentId] = useState<number | null>(null);
  const [commentNum, setCommentNum] = useState<number>();
  const [comments, setComments] = useState<CommentType[]>();
  const { isLoggedIn } = useAuthStore();
  const toggleReplyBox = (commentId: number) => {
    setOpenCommentId((prev) => (prev === commentId ? null : commentId));
  };

  useEffect(() => {
    patchViews(numericPostId);
  }, [numericPostId]);

  const { data, isLoading } = useQuery({
    queryKey: ['postDetail', numericPostId],
    queryFn: () =>
      numericPostId ? fetchPost(numericPostId) : Promise.resolve(null), // queryFn을 함수로 래핑
    enabled: !!numericPostId,
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (data) {
      setComments(data.comments);
      setCommentNum(data.commentNum);
    }
  }, [data]);

  if (isLoading || !data) return <CommunityDetail />;

  return (
    <Container>
      <PostContent
        category={category}
        categoryType={type}
        commentNum={commentNum}
      />
      <CommentHeader>
        <Title>전체 댓글&nbsp;</Title>
        <Count>{`[${commentNum}]`}</Count>
      </CommentHeader>
      <CommentList>
        {comments?.map((comment, idx) => (
          <React.Fragment key={idx}>
            <Comment
              key={idx}
              comment={comment}
              postId={numericPostId}
              isOpen={openCommentId === comment.commentId}
              toggleReplyBox={() => toggleReplyBox(comment.commentId)}
              setComments={setComments}
              setCommentNum={setCommentNum}
              setOpenCommentId={setOpenCommentId}
            />
            {comment.replies.length > 0 &&
              comment.replies.map((reply, replyIdx) => (
                <Reply
                  key={replyIdx}
                  userName={reply.name}
                  animals={reply.userPets}
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
      {isLoggedIn && (
        <CommentWriteBox
          postId={data.id}
          setComments={setComments}
          setCommentNum={setCommentNum}
        />
      )}
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
