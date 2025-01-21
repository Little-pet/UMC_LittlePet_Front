import styled from 'styled-components';
import animalIcon from '#/assets/동물 아이콘.svg';
import femaleIcon from '#/assets/성별여자.svg';
import maleIcon from '#/assets/성별남자.svg';
import replyArrowIcon from '#/assets/reply-arrow.svg';

interface ReplyProps {
  userName: string; // 유저 이름
  animal: string; // 동물 이름
  gender: 'male' | 'female'; // 성별 ('male' 또는 'female')
  content: string; // 댓글 내용
  date: string; // 날짜 (YYYY-MM-DD)
  time: string; // 시간 (HH:mm)
}
const Reply: React.FC<ReplyProps> = ({
  userName,
  animal,
  gender,
  content,
  date,
  time,
}) => (
  <CommentContainer>
    <Header>
      <img src={replyArrowIcon} />
      <UserName>{userName}</UserName>
      <UserInfo>
        <IconGroup>
          <img src={animalIcon} style={{ width: '14px', height: '14px' }} />
          <IconText>{animal}</IconText>
        </IconGroup>
        {gender == 'female' ? (
          <img src={femaleIcon} style={{ width: '8px' }} />
        ) : (
          <img src={maleIcon} style={{ width: '10px' }} />
        )}
      </UserInfo>
    </Header>
    <Content>{content}</Content>
    <Footer>
      <TimeStamp>
        {date}&nbsp;&nbsp;{time}
      </TimeStamp>
      <ReplyButton>답글 쓰기</ReplyButton>
    </Footer>
  </CommentContainer>
);

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
  background-color: #ffffff;
`;
