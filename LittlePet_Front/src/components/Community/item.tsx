import styled from 'styled-components';
import React from 'react';
import animalIcon from '#/assets/동물 아이콘.svg';
import vectorIcon from '#/assets/Vector.svg';
import { Link } from 'react-router-dom';

// Props 타입 정의
interface ItemProps {
  title: string;
  postId: string | number;
  subText: string;
  description: string;
  content: string;
  footerData: string[];
  img?: string; // 이미지가 없을 수 있으므로 선택적 프로퍼티로 설정
}
// 카테고리를 들어가자마자 볼 수 있는 미리보기 글들의 컴포넌트
const Item: React.FC<ItemProps> = ({
  title,
  postId,
  subText,
  description,
  content,
  footerData,
  img,
}) => {
  return (
    <ContainerLink to={`/community/${postId}`}>
      <Header>
        <Title>{title}</Title>
        <SubHeader>
          <Icon src={animalIcon} alt='Animal Icon' />
          <SubText>{subText}</SubText>
        </SubHeader>
      </Header>
      {img ? (
        <Wrapper>
          <TextWrapper>
            <Description>{description}</Description>
            <Content>{content}</Content>
          </TextWrapper>
          <Image src={img} />
        </Wrapper>
      ) : (
        <>
          <Description>{description}</Description>
          <Content>{content}</Content>
        </>
      )}
      <Footer>
        {footerData.map((item: string, index: number) => {
          return index === 2 ? (
            <FooterContainer key={index}>
              <FooterItem style={{ margin: '0' }}>조회&nbsp;</FooterItem>
              <FooterItem>{item}</FooterItem>
              <VectorIcon src={vectorIcon} />
            </FooterContainer>
          ) : index === 3 ? (
            <FooterContainer key={index}>
              <FooterItem style={{ margin: '0' }}>좋아요&nbsp;</FooterItem>
              <FooterItem style={{ color: '#C76B6B' }}>{item}</FooterItem>
              <VectorIcon src={vectorIcon} />
            </FooterContainer>
          ) : index === 4 ? (
            <FooterContainer key={index}>
              <FooterItem style={{ margin: '0' }}>댓글&nbsp;</FooterItem>
              <FooterItem style={{ color: '#6EA8FE' }}>{item}</FooterItem>
            </FooterContainer>
          ) : (
            <FooterContainer key={index}>
              <FooterItem>{item}</FooterItem>
              <VectorIcon src={vectorIcon} />
            </FooterContainer>
          );
        })}
      </Footer>
    </ContainerLink>
  );
};

export default Item;

const ContainerLink = styled(Link)`
  height: 132px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 25px;
  text-decoration: none;
  @media only screen and (min-width: 800px) {
    padding: 0 96px;
  }
`;

const Header = styled.div`
  width: 343px;
  height: 22px;
  display: flex;
  align-items: center;
  gap: 19px;
`;

const Title = styled.div`
  font-size: 22px;
  font-family: 'Pretendard-SemiBold';
  color: #262627;
`;

const SubHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const SubText = styled.div`
  font-size: 14px;
  font-family: 'Pretendard-SemiBold';
  color: #262627;
`;

const Description = styled.div`
  width: 100%;
  font-size: 18px;
  font-family: 'Pretendard-SemiBold';
  box-sizing: border-box;
  color: #262627;
`;

const Content = styled.div`
  width: 94%;
  font-size: 12px;
  font-family: 'Pretendard-Medium';
  line-height: 18px;
  box-sizing: border-box;
  color: #737373;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 259px;
`;

const Image = styled.img`
  width: 84px;
  height: 68px;
  border-radius: 5px;
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
  font-size: 14px;
  font-family: 'Pretendard-Medium';
  margin-right: 12px;
  color: #333333;
`;

const Icon = styled.img`
  width: 17px;
  height: 17px;
`;

const VectorIcon = styled.img``;
