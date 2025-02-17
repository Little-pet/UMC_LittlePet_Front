import styled from 'styled-components';
import { AnimalIcons } from '#/components/icon';
import femaleIcon from '#/assets/성별여자.svg';
import maleIcon from '#/assets/성별남자.svg';
import replyArrowIcon from '#/assets/reply-arrow.svg';

interface ReplyProps {
  userName: string; // 유저 이름
  animal: string; // 동물 이름
  gender: 'male' | 'female'; // 성별 ('male' 또는 'female')
  content: string; // 댓글 내용
  time: string; // 시간 (HH:mm)
}
const Reply: React.FC<ReplyProps> = ({
  userName,
  animal,
  gender,
  content,
  time,
}) => {
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
        <img src={replyArrowIcon} />
        <UserName>{userName}</UserName>
        {animal && (
          <UserInfo>
            <IconGroup>
              <img
                src={getAnimalIcon(animal)}
                style={{ width: '20px', height: '20px' }}
              />
              <IconText>{animal}</IconText>
            </IconGroup>
            {gender == 'female' ? (
              <img src={femaleIcon} style={{ width: '8px' }} />
            ) : (
              <img src={maleIcon} style={{ width: '10px' }} />
            )}
          </UserInfo>
        )}
      </Header>
      <Content>{content}</Content>
      <Footer>
        <TimeStamp>{time.split(':').slice(0, 2).join(':')}</TimeStamp>
        <ReplyButton>답글 쓰기</ReplyButton>
      </Footer>
    </CommentContainer>
  );
};

export default Reply;
const CommentContainer = styled.div`
  border-bottom: 1px solid #e6e6e6;
  padding: 10px 25px;
  padding-left: 50px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  background-color: #6ea8fe0d;
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
