import React, { useState, useEffect, FormEvent } from 'react';
import styled from 'styled-components';
import { AnimalIcons } from '#/components/icon';
import axios from 'axios';
import { useUserStore } from '#/context/UserStore';
import { useAuthStore } from '#/context/AuthStore';
// 실제 댓글 작성 컴포넌트
const CommentWriteBox: React.FC = ({ postId, parentId }) => {
  const [commentText, setCommentText] = useState<string>('');
  const [commentCount, setCommentCount] = useState<number>(0);
  const isTextValid =
    commentText.trim().length >= 1 && commentText.length <= 500;
  useEffect(() => {
    setCommentCount(commentText.length);
  }, [commentText]);
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
  const { user, pets, isLoading } = useUserStore();
  //console.log(parentId);
  const author = user?.name;
  const animal = pets[0]?.petCategory;
  const userId = useAuthStore((state) => state.userId);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isTextValid) {
      alert('댓글을 입력해주세요!');
      return;
    }
    const requestBody = {
      content: commentText,
      userId: userId, // 실제 유저 ID
      postId: postId,
      parentId: parentId || null,
    };
    console.log(requestBody);
    try {
      const response = await axios.post(
        `https://umclittlepet.shop/api/community/${postId}/comments`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      console.log('댓글 작성 성공', response.data);
      window.location.reload();
    } catch (error) {
      console.error('댓글 작성 실패:', error);
    }
  };
  return (
    <CommentForm onSubmit={handleSubmit}>
      <HeaderWrapper>
        <Header>
          <UserName>{author}</UserName>
          {animal && (
            <UserInfo>
              <IconGroup>
                <img
                  src={getAnimalIcon(animal)}
                  style={{ width: '20px', height: '20px' }}
                />
                <IconText>{animal}</IconText>
              </IconGroup>
            </UserInfo>
          )}
        </Header>
        <InputSection>
          <CommentInput
            placeholder='댓글을 남겨 이야기를 나눠보세요'
            onChange={(e) => setCommentText(e.target.value)}
            value={commentText}
          />
          <CountRow>
            <CurrentCount>{commentCount}&nbsp;</CurrentCount>
            <MaxCount>/ 500</MaxCount>
          </CountRow>
        </InputSection>
      </HeaderWrapper>
      <ButtonWrapper>
        <RegisterButton type='submit' value='제출'>
          등록하기
        </RegisterButton>
      </ButtonWrapper>
    </CommentForm>
  );
};

export default CommentWriteBox;

// 상단 영역 스타일
const CommentForm = styled.form`
  margin: 0 25px;
  padding: 12px 20px;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  @media only screen and (min-width: 800px) {
    margin: 0 96px;
  }
`;

// 헤더(닉네임, 동물 정보) 래퍼
const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
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
// 댓글 입력 섹션
const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

// 댓글 입력창
const CommentInput = styled.textarea`
  padding: 4px 12px;
  resize: none; /* 사용자가 크기 조정 불가 */
  min-height: 71px;
  border: 1px solid #6ea8fe;
  border-radius: 5px;
  outline: none;
  color: #737373;
  font-size: 8px;
  font-family: Pretendard-Medium;
  line-height: 18px;
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

// 댓글 글자수 카운트 래퍼
const CountRow = styled.div`
  display: flex;
  font-size: 10px;
  font-family: 'Pretendard-Medium';
  justify-content: flex-end;
`;

const CurrentCount = styled.div``;

const MaxCount = styled.div`
  color: #737373;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end; /* 오른쪽 끝 정렬 */
`;

const RegisterButton = styled.button`
  width: 67px;
  height: 25px;
  border: none;
  border-radius: 5px;
  background-color: #6ea8fe;
  color: #ffffff;
  font-size: 10px;
  font-family: 'Pretendard-SemiBold';
  box-sizing: border-box;
  cursor: pointer; /* 클릭 가능 마우스 포인터 */
`;
