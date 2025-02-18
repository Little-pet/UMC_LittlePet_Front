import styled from 'styled-components';
import viewIcon from '#/assets/조회수.svg';
import commentIcon from '#/assets/댓글.svg';
import heartIcon from '#/assets/좋아요.svg';
import { Link } from 'react-router-dom';
interface Content {
  content: string;
  sequence: number;
}
interface ChallengeItemProps {
  postId: number; // 게시물 ID
  title: string; // 게시물 제목
  name: string; // 작성자 이름
  views: number; // 조회수
  likes: number; // 좋아요 수
  comments: number; // 댓글 수
  contents: Content[];
  category: string;
  type: string;
}
const ChallengeItem: React.FC<ChallengeItemProps> = ({
  postId,
  title,
  name,
  views,
  likes,
  comments,
  contents,
  category,
  type,
}) => {
  function isImageUrl(url: string): boolean {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  }
  const getFirstImageContent = (contents) => {
    for (const item of contents) {
      if (isImageUrl(item.content)) {
        return item;
      }
    }
    return null;
  };
  const imageContent = getFirstImageContent(contents);
  return (
    <CardWrapper to={`/community/${type}/${postId}`} state={{ category, type }}>
      {imageContent && <CardBackground bgImage={imageContent.content} />}
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <MetaData>
          <MetaText>{name}</MetaText>
          <MetaItem>
            <ViewIcon src={viewIcon} alt='views' />
            <MetaText>{views}</MetaText>
          </MetaItem>
          <MetaItem>
            <HeartIcon src={heartIcon} alt='likes' />
            <MetaText>{likes}</MetaText>
          </MetaItem>
          <MetaItem>
            <CommentIcon src={commentIcon} alt='comments' />
            <MetaText>{comments}</MetaText>
          </MetaItem>
        </MetaData>
      </CardContent>
    </CardWrapper>
  );
};

export default ChallengeItem;

const ViewIcon = styled.img`
  @media only screen and (min-width: 800px) {
    height: 14px;
  }
`;
const HeartIcon = styled.img`
  width: 16px;
  @media only screen and (min-width: 800px) {
    width: 23px;
  }
`;
const CommentIcon = styled.img`
  width: 12px;
  @media only screen and (min-width: 800px) {
    width: 17px;
  }
`;
// 최상위 카드
const CardWrapper = styled(Link)`
  width: 165px;
  height: 140px;
  border-radius: 10px;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.13);
  overflow: hidden;
  margin-bottom: 13px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  @media only screen and (min-width: 800px) {
    width: 300px;
    height: 220px;
  }
`;

// 상단 배경
const CardBackground = styled.div<{ bgImage?: string }>`
  height: 61%;
  background-color: #d9d9d9;
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center;
  @media only screen and (min-width: 800px) {
    height: 63%;
  }
`;

// 하단 텍스트 및 메타 정보
const CardContent = styled.div`
  padding: 11px 12px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
  box-sizing: border-box;
  justify-content: space-between;
  @media only screen and (min-width: 800px) {
    padding: 20px 18px;
    gap: 15px;
  }
`;

// 제목 텍스트
const CardTitle = styled.div`
  font-size: 10px;
  font-family: 'Pretendard-Bold';
  line-height: 12px;
  color: #262627;
  @media only screen and (min-width: 800px) {
    font-size: 15px;
  }
`;

// 메타 데이터 컨테이너
const MetaData = styled.div`
  display: flex;
  align-items: center;
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
  @media only screen and (min-width: 800px) {
    font-size: 12px;
  }
`;
