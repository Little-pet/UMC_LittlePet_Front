import styled from 'styled-components';
import thumbIcon from '#/assets/thumb-up.svg';
import { useState } from 'react';

interface LikeButtonProps {
  count: number; // 초기 좋아요 개수
}

const LikeButton: React.FC<LikeButtonProps> = ({ count }) => {
  const [likeCount, setLikeCount] = useState<number>(count);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const handleLike = () => {
    if (isLiked) {
      // 이미 좋아요를 누른 상태라면 좋아요 해제 => -1
      setLikeCount((prev) => prev - 1);
      setIsLiked(false);
    } else {
      // 좋아요가 아닌 상태라면 좋아요 => +1
      setLikeCount((prev) => prev + 1);
      setIsLiked(true);
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
  margin-top: 13px;
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
