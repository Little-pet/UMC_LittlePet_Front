import React from 'react';
import { useParams } from 'react-router-dom';
import PostContent from '#/components/Community/Post/postContent';
import Comment from '#/components/Community/Post/comment';
import styled from 'styled-components';
import Reply from '#/components/Community/Post/reply';
import CommentWriteBox from '#/components/Community/Post/commentWriteBox';

// CommentList의 높이를 어떻게 고정시킬껀지는 생각해봐야겠다..
const DetailPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  // 추후 백엔드와 연결
  /*  const { data, isLoading, isError } = useQuery({
    queryFn: () => useGetDetail({ postId }),
    queryKey: ['postDetail', postId],
  }); */

  return (
    <Container>
      <PostContent
        title='토끼가 어느 순간부터 사료를 먹지 않아요..'
        author='천혜향'
        badgeType='challenge'
        animal='토끼'
        gender='male'
        date='2024.12.23'
        time='12:52'
        footerData={['896', '8', '17']}
        description='원래 매우 잘 먹던 아이가 한 일주일 정도 지났나.. 사료를 안 먹네요. 이렇게 두다가는 굶을까봐 간식을 줬는데 간식은 또 잘 먹더라구요...'
        likeCount={11}
      />
      <CommentHeader>
        <Title>전체 댓글&nbsp;</Title>
        <Count>[29]</Count>
      </CommentHeader>
      <CommentList>
        <Comment
          userName='감초'
          animal='햄스터'
          gender='male'
          content='사료를 먹지 않는다고 간식을 계속 주는 건 좋지 않은 것 같아요... 건초는 주셨나요?'
          date='2025.01.15'
          time='13:01'
        />
        <Comment
          userName='감초'
          animal='햄스터'
          gender='male'
          content='사료를 먹지 않는다고 간식을 계속 주는 건 좋지 않은 것 같아요... 건초는 주셨나요?'
          date='2025.01.15'
          time='13:01'
        />
        <Reply
          userName='천혜향'
          animal='토끼'
          gender='female'
          content='헉... 그런가요..ㅠㅠ 건초를 줘도 안 먹더라구요... 간식만 먹어요 오직 간식만....저도 어떻게 해야할지 모르겠네요.'
          date='2025.01.15'
          time='13:01'
        />
        <Comment
          userName='감초'
          animal='햄스터'
          gender='male'
          content='사료를 먹지 않는다고 간식을 계속 주는 건 좋지 않은 것 같아요... 건초는 주셨나요?'
          date='2025.01.15'
          time='13:01'
        />
        <Reply
          userName='천혜향'
          animal='토끼'
          gender='female'
          content='헉... 그런가요..ㅠㅠ 건초를 줘도 안 먹더라구요... 간식만 먹어요 오직 간식만....저도 어떻게 해야할지 모르겠네요.'
          date='2025.01.15'
          time='13:01'
        />
      </CommentList>
      <CommentHeader>
        <Title>댓글 쓰기</Title>
      </CommentHeader>
      <CommentWriteBox />
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
