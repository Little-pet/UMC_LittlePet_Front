import styled from 'styled-components';
import viewIcon from '#/assets/조회수.svg';
import commentIcon from '#/assets/댓글.svg';
import heartIcon from '#/assets/좋아요.svg';
import { Link } from 'react-router-dom';

// 최상위 카드
const CardWrapper = styled(Link)`
  width: 165px;
  height: 140px;
  border-radius: 10px;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.13);
  overflow: hidden;
  margin-bottom: 13px;
  text-decoration: none;
`;

// 상단 배경
const CardBackground = styled.div`
  height: 60%;
  background-color: #d9d9d9;
`;

// 하단 텍스트 및 메타 정보
const CardContent = styled.div`
  padding: 8px 12px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

// 제목 텍스트
const CardTitle = styled.div`
  font-size: 10px;
  font-family: 'Pretendard-Bold';
  line-height: 12px;
  color: #262627;
`;

// 메타 데이터 컨테이너
const MetaData = styled.div`
  display: flex;
  gap: 6px;
`;

// 메타 정보 항목 (예: 이름, 조회수, 좋아요 수 등)
const MetaItem = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
`;

// 메타 텍스트
const MetaText = styled.div`
  font-size: 8px;
  font-family: 'Pretendard-Medium';
  color: #737373;
`;
interface ChallengeItemProps {
  postId: string; // 게시물 ID
  title: string; // 게시물 제목
  name: string; // 작성자 이름
  views: number; // 조회수
  likes: number; // 좋아요 수
  comments: number; // 댓글 수
}
const ChallengeItem: React.FC<ChallengeItemProps> = ({
  postId,
  title,
  name,
  views,
  likes,
  comments,
}) => {
  return (
    <CardWrapper to={`/community/${postId}`}>
      <CardBackground />
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <MetaData>
          <MetaText>{name}</MetaText>
          <MetaItem>
            <img src={viewIcon} alt='views' />
            <MetaText>{views}</MetaText>
          </MetaItem>
          <MetaItem>
            <img src={heartIcon} alt='likes' style={{ height: '7px' }} />
            <MetaText>{likes}</MetaText>
          </MetaItem>
          <MetaItem>
            <img src={commentIcon} alt='comments' style={{ height: '8px' }} />
            <MetaText>{comments}</MetaText>
          </MetaItem>
        </MetaData>
      </CardContent>
    </CardWrapper>
  );
};

export default ChallengeItem;
