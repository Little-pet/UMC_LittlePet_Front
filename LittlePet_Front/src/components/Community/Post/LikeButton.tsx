import React from 'react';
import styled from 'styled-components';
import thumbIcon from '#/assets/thumb-up.svg';
import axios from 'axios';
import { useAuthStore } from '#/context/AuthStore';
import { useNavigate } from 'react-router-dom';
interface LikeButtonProps {
  count: number; // 초기 좋아요 개수
  postId: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ count, postId }) => {
  const { userId, isLoggedIn } = useAuthStore();
  const navigate = useNavigate();
  const handleLike = async () => {
    if (!isLoggedIn) {
      navigate('/login');
    }
    try {
      const response = await axios.post(
        `https://umclittlepet.shop/api/like/${userId}/${postId}`
      );
      console.log('좋아요 등록/취소 성공:', response.data);

      window.location.reload();
    } catch (error) {
      console.error('좋아요 등록/취소 실패:', error);
    }
  };
  return (
    <LikeButtonWrapper onClick={handleLike}>
      <LikeIcon src={thumbIcon} />
      <LikeCount>{count}</LikeCount>
    </LikeButtonWrapper>
  );
};

export default LikeButton;
const LikeButtonWrapper = styled.div`
  width: 68px;
  height: 30px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  padding: 0 14px;
  box-sizing: border-box;
  justify-content: space-between;
  box-shadow: 0px 2px 5px #00000040;
  cursor: pointer;
`;

const LikeIcon = styled.img`
  width: 15px;
  height: 15px;
`;

const LikeCount = styled.div`
  font-size: 16px;
  font-family: 'Pretendard-SemiBold';
  color: #c76b6b;
`;
