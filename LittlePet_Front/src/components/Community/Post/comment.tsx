import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AnimalIcons } from '#/components/icon';
import CommentWriteBox from './commentWriteBox';
import { useAuthStore } from '#/store/AuthStore';
import { CommentType } from '#/store/CommunityStore';
interface CommentProps {
  postId: number;
  isOpen: boolean;
  comment: CommentType;
  toggleReplyBox: () => void;
  setComments?: (comments: CommentType[]) => void;
  setCommentNum?: (num: number) => void;
  setOpenCommentId?: (num: number | null) => void;
}
const Comment: React.FC<CommentProps> = ({
  postId,
  isOpen,
  toggleReplyBox,
  setComments,
  setCommentNum,
  setOpenCommentId,
  comment,
}) => {
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  const handleReplyClick = () => {
    if (!isLoggedIn) {
      navigate('/login'); // 로그인되지 않았으면 로그인 페이지로 이동
      return;
    }
    toggleReplyBox(); //  로그인된 경우에만 답글 입력창 열기
  };

  const getAnimalIcon = (category: string) => {
    switch (category) {
      case '햄스터':
        return AnimalIcons.hamster;
      case '토끼':
        return AnimalIcons.rabbit;
      case '고슴도치':
        return AnimalIcons.hedgehog;
      case '페럿':
        return AnimalIcons.ferret;
      case '앵무새':
        return AnimalIcons.parrot;
      case '거북이':
        return AnimalIcons.turtle;
      case '뱀':
        return AnimalIcons.snake;
    }
  };

  return (
    <CommentContainer>
      <Header>
        <UserName>{comment.name}</UserName>
        {comment.userPets?.map((animal, idx) => (
          <UserInfo key={idx}>
            <IconGroup>
              <img
                src={getAnimalIcon(animal)}
                style={{ width: '20px', height: '20px' }}
              />
              <IconText>{animal}</IconText>
            </IconGroup>
          </UserInfo>
        ))}
      </Header>
      <Content>{comment.content}</Content>
      <Footer>
        <TimeStamp>
          {comment.updatedTime.split(':').slice(0, 2).join(':')}
        </TimeStamp>
        <ReplyButton onClick={handleReplyClick}>답글 쓰기</ReplyButton>
      </Footer>
      {isOpen && (
        <CommentWriteBox
          postId={postId}
          parentId={comment.commentId}
          setComments={setComments}
          setCommentNum={setCommentNum}
          setOpenCommentId={setOpenCommentId}
        />
      )}
    </CommentContainer>
  );
};

export default Comment;
const CommentContainer = styled.div`
  border-bottom: 1px solid #e6e6e6;
  padding: 16px 25px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  @media only screen and (min-width: 800px) {
    margin: 0 96px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 18px;
`;

const UserName = styled.div`
  font-size: 12px;
  font-family: Pretendard-SemiBold;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const IconGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const IconText = styled.div`
  font-size: 10px;
  font-family: Pretendard-Medium;
`;

const Content = styled.div`
  font-size: 10px;
  font-family: Pretendard-Medium;
  color: #262627cc;
  line-height: 18px;
`;

const Footer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  height: 22px;
`;

const TimeStamp = styled.div`
  font-size: 10px;
  font-family: Pretendard-Medium;
  color: #737373;
`;

const ReplyButton = styled.div`
  width: 56px;
  height: 22px;
  border-radius: 5px;
  border: 1px solid #e6e6e6;
  font-size: 10px;
  font-family: Pretendard-Medium;
  color: #737373;
  line-height: 22px;
  text-align: center;
  cursor: pointer;
`;
