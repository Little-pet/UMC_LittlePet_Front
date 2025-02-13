import styled from 'styled-components';
import thumbIcon from '#/assets/thumb-up.svg';
import { useState } from 'react';
import axios from 'axios';
interface LikeButtonProps {
  count: number; // 초기 좋아요 개수
  postId: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ count, postId }) => {
  const [likeCount, setLikeCount] = useState<number>(count);
  const userId = 4;
  const handleLike = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + `/like/${userId}/${postId}`
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
      <LikeCount>{likeCount}</LikeCount>
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
