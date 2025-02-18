import LikeButton from '#/components/Community/Post/LikeButton'; // 실제 컴포넌트 경로로 수정
import styled from 'styled-components';
import { AnimalIcons } from '#/components/icon';
import vectorIcon from '#/assets/Vector.svg';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '#/components/DeleteModal';
import ChallengerBadge from '@assets/챌린저.svg';
import LikeBadge from '@assets/소셜응원왕.svg';
import MasterWriterBadge from '@assets/글쓰기마스터.svg';
import CommentBadge from '@assets/소통천재.svg';
import { useCommunityStore } from '#/context/CommunityStore';
import { useUserStore } from '#/context/UserStore';
import { useAuthStore } from '#/context/AuthStore';
const badgeIconMapping: { [key: string]: string } = {
  글쓰기마스터: MasterWriterBadge,
  소셜응원왕: LikeBadge,
  소통천재: CommentBadge,
  챌린저: ChallengerBadge,
};
interface Content {
  content: string;
  sequence: number;
}
interface PostContentProps {
  title: string;
  author: string;
  badgeType: string[];
  animal: string;
  time: string;
  footerData: number[];
  contents: Content[];
  likeCount: number;
  id: number;
  category: string;
  categoryType: string;
}
const PostContent: React.FC<PostContentProps> = ({
  title,
  author,
  badgeType,
  animal,
  time,
  footerData,
  contents,
  likeCount,
  id,
  category,
  categoryType,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const icon = badgeIconMapping[badgeType[0]];
  function isImageUrl(url: string): boolean {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  }

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
  const { deletePost } = useCommunityStore();
  const { user, fetchUser } = useUserStore();
  const userId = useAuthStore((state) => state.userId);
  const handleDelete = async () => {
    await deletePost(id);
    navigate(-1);
  };
  useEffect(() => {
    fetchUser(userId);
  }, [fetchUser]);

  return (
    <ContentBox>
      <PostContentWrapper>
        <Title>{title}</Title>
        <InfoWrapper>
          <InfoSection>
            <Text>{author}</Text>
            <BadgeIcon src={icon} />
          </InfoSection>
          <InfoSection>
            <AnimalInfo>
              <img
                src={getAnimalIcon(animal)}
                style={{ width: '20px', height: '20px' }}
              />
              <Text>{animal}</Text>
            </AnimalInfo>
          </InfoSection>
          <TimeText>{time.split(':').slice(0, 2).join(':')}</TimeText>
        </InfoWrapper>
        <Footer>
          {footerData.map((item, index) => (
            <FooterContainer key={index}>
              <FooterItem style={{ margin: '0' }}>
                {index === 0 ? '조회' : index === 1 ? '좋아요' : '댓글'}&nbsp;
              </FooterItem>
              <FooterItem
                style={{
                  color: index === 1 ? '#C76B6B' : index === 2 ? '#6EA8FE' : '',
                }}
              >
                {item}
              </FooterItem>
              {index !== 2 && <VectorIcon src={vectorIcon} />}
            </FooterContainer>
          ))}
        </Footer>
        {contents.map((item, idx) =>
          isImageUrl(item.content) ? (
            <img key={idx} src={item.content} alt={`content-${idx}`} />
          ) : (
            <DescriptionText key={idx}>{item.content}</DescriptionText>
          )
        )}
      </PostContentWrapper>
      <Container>
        <LikeButton count={likeCount} postId={id} />
        {user?.name == author ? (
          <ActionGroup>
            <ActionText
              isClickable
              onClick={() =>
                navigate(`/community/${categoryType}/${id}/edit-post`, {
                  state: {
                    category,
                    categoryType,
                    id,
                    initialTitle: title,
                    animal,
                    contents,
                  },
                })
              }
            >
              수정
            </ActionText>
            <Divider>|</Divider>
            <ActionText
              isClickable
              onClick={() => setIsModalOpen(!isModalOpen)}
            >
              삭제
            </ActionText>
          </ActionGroup>
        ) : null}
      </Container>
      {isModalOpen && (
        <Overlay>
          <DeleteModal
            onClose={() => setIsModalOpen(false)}
            onDelete={handleDelete}
          />
        </Overlay>
      )}
    </ContentBox>
  );
};

export default PostContent;
const ContentBox = styled.div`
  padding: 0 25px;
  margin: 20px 0;
  margin-top: 30px;
  @media only screen and (min-width: 800px) {
    margin: 20px 96px;
    margin-top: 30px;
  }
`;
const PostContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const Title = styled.div`
  font-size: 20px;
  font-family: 'Pretendard-SemiBold';
  line-height: 22px;
`;
const InfoWrapper = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;
const InfoSection = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;
const TimeText = styled.div`
  font-size: 12px;
  font-family: Pretendard-Medium;
  color: #737373;
`;
const Footer = styled.div`
  height: 22px;
  display: flex;
  align-items: center;
  gap: 12px;
`;
const FooterContainer = styled.div`
  display: flex;
  align-items: center;
`;
const FooterItem = styled.div`
  font-size: 12px;
  font-family: 'Pretendard-Medium';
  margin-right: 12px;
  color: ##737373;
`;
const VectorIcon = styled.img`
  width: 1px;
  height: 10px;
`;
const AnimalInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;
const Text = styled.div`
  font-size: 14px;
  font-family: Pretendard-SemiBold;
`;
const DescriptionText = styled.div`
  margin-top: 10px;
  font-size: 12px;
  font-family: Pretendard-Medium;
  color: #262627cc;
  line-height: 18px;
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 13px;
`;

const ActionGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const ActionText = styled.div<{ isClickable?: boolean }>`
  font-size: 12px;
  color: #737373;
  font-family: 'Pretendard-Medium';
  cursor: ${({ isClickable }) => (isClickable ? 'pointer' : 'default')};
`;

const Divider = styled(ActionText)`
  cursor: default;
`;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000080;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;
const BadgeIcon = styled.img`
  height: 15px;
  width: auto;
`;
