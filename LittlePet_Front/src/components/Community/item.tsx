import styled, { keyframes } from 'styled-components';
import React from 'react';
import vectorIcon from '#/assets/Vector.svg';
import { Link } from 'react-router-dom';
import hamsterIcon from '#/assets/hamster.svg';
import rabbitIcon from '#/assets/rabbit.svg';
import hedgehogIcon from '#/assets/hedgehog.svg';
// Props 타입 정의
interface Content {
  content: string;
  sequence: number;
}
interface ItemProps {
  title: string;
  postId: string | number;
  subText: string;
  description: string;
  content: string;
  footerData: string[];
  contents: Content[];
}
// 카테고리를 들어가자마자 볼 수 있는 미리보기 글들의 컴포넌트
const Item: React.FC<ItemProps> = ({
  title,
  postId,
  subText,
  description,
  content,
  footerData,
  contents,
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
  const getAnimalIcon = (category: string) => {
    switch (category) {
      case '햄스터':
        return hamsterIcon;
      case '토끼':
        return rabbitIcon;
      case '고슴도치':
        return hedgehogIcon;
    }
  };
  return (
    <ContainerLink to={`/community/${postId}`}>
      <Header>
        <Title>{title}</Title>
        <SubHeader>
          <Icon src={getAnimalIcon(subText)} alt='Animal Icon' />
          <SubText>{subText}</SubText>
        </SubHeader>
      </Header>
      {imageContent ? (
        <Wrapper>
          <TextWrapper>
            <Description>{description}</Description>
            {contents
              .filter((item) => !isImageUrl(item.content))
              .map((item, idx) => (
                <Content key={idx}>{item.content}</Content>
              ))}
          </TextWrapper>
          <Image src={imageContent.content} />
        </Wrapper>
      ) : (
        <>
          <Description>{description}</Description>
          <Content>{content}</Content>
        </>
      )}
      <Footer>
        {footerData.map((item: string, index: number) => {
          if (index === 0) {
            return (
              <NameContainer key={index}>
                <div style={{ overflow: 'hidden' }}>
                  <ScrollingUsername>{item}</ScrollingUsername>
                </div>
                <VectorIcon src={vectorIcon} alt='Vector Icon' />
              </NameContainer>
            );
          } else if (index === 2) {
            return (
              <FooterContainer key={index}>
                <FooterItem style={{ margin: '0' }}>조회&nbsp;</FooterItem>
                <FooterItem>{item}</FooterItem>
                <VectorIcon src={vectorIcon} alt='Vector Icon' />
              </FooterContainer>
            );
          } else if (index === 3) {
            return (
              <FooterContainer key={index}>
                <FooterItem style={{ margin: '0' }}>좋아요&nbsp;</FooterItem>
                <FooterItem style={{ color: '#C76B6B' }}>{item}</FooterItem>
                <VectorIcon src={vectorIcon} alt='Vector Icon' />
              </FooterContainer>
            );
          } else if (index === 4) {
            return (
              <FooterContainer key={index}>
                <FooterItem style={{ margin: '0' }}>댓글&nbsp;</FooterItem>
                <FooterItem style={{ color: '#6EA8FE' }}>{item}</FooterItem>
              </FooterContainer>
            );
          } else {
            return (
              <FooterContainer key={index}>
                <FooterItem>{item}</FooterItem>
                <VectorIcon src={vectorIcon} alt='Vector Icon' />
              </FooterContainer>
            );
          }
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
  width: 24px;
  height: 24px;
`;

const VectorIcon = styled.img``;
const scrollText = keyframes`

  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const ScrollingUsername = styled.div`
  font-size: 14px;
  margin-right: 12px;
  font-family: 'Pretendard-Medium';
  white-space: nowrap;
  position: relative;
  color: #333333;
  /* 텍스트 길이가 컨테이너보다 길 때 자동 스크롤 애니메이션 */
  animation: ${(props) =>
      props.children && String(props.children).length > 5 ? scrollText : 'none'}
    10s linear infinite;
`;
const NameContainer = styled.div`
  display: flex;
  align-items: center;
  max-width: 75px;
  overflow: hidden;
`;
