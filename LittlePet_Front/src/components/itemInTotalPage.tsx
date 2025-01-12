import styled from 'styled-components';
import animalIcon from '../assets/동물 아이콘.png';
import vectorIcon from '#/assets/Vector 7.png';
const FooterContainer = styled.div`
  display: flex;
  align-items: center;
`;

const FooterText = styled.div`
  font-size: 10px;
  font-family: 'Pretendard-Medium';
  margin-right: 10px;
`;
const VectorIcon = styled.img`
  width: 1px;
  height: 10px;
`;
const FooterStyled = styled.div`
  height: 22px;
  display: flex;
  align-items: center;
  gap: 10px;
`;
// 카테고리 전체보기 페이지에서 하나의 글 맨 밑에 있는 컴포넌트(작성자, 작성날짜, 조회수, 좋아요, 댓글 수 표시)
const FooterInTotalItem = (footerData) => {
  return (
    <FooterStyled>
      {footerData.map((item: string, index: number) => {
        return index === 2 ? (
          <FooterContainer key={index}>
            <FooterText style={{ margin: '0' }}>조회&nbsp;</FooterText>
            <FooterText>{item}</FooterText>
            <VectorIcon src={vectorIcon} />
          </FooterContainer>
        ) : index === 3 ? (
          <FooterContainer key={index}>
            <FooterText style={{ margin: '0' }}>좋아요&nbsp;</FooterText>
            <FooterText style={{ color: '#C76B6B' }}>{item}</FooterText>
            <VectorIcon src={vectorIcon} />
          </FooterContainer>
        ) : index === 4 ? (
          <FooterContainer key={index}>
            <FooterText style={{ margin: '0' }}>댓글&nbsp;</FooterText>
            <FooterText style={{ color: '#6EA8FE' }}>{item}</FooterText>
          </FooterContainer>
        ) : (
          <FooterContainer key={index}>
            <FooterText>{item}</FooterText>
            <VectorIcon src={vectorIcon} />
          </FooterContainer>
        );
      })}
    </FooterStyled>
  );
};

// Styled Components
const Container = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-left: 25px;
  padding-right: 20px;
  box-sizing: border-box;
`;

const Header = styled.div`
  height: 22px;
  display: flex;
  align-items: center;
  gap: 19px;
`;

const Title = styled.div`
  font-size: 18px;
  font-family: 'Pretendard-SemiBold';
`;

const SubHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const SubText = styled.div`
  font-size: 10px;
  font-family: 'Pretendard-SemiBold';
`;

const Description = styled.div`
  width: 100%;
  height: 22px;
  font-size: 14px;
  font-family: 'Pretendard-SemiBold';
  box-sizing: border-box;
  line-height: 22px;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  padding-left: 25px;
  padding-right: 20px;
  align-items: center;
  box-sizing: border-box;
`;

const TextWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 80%;
  flex-direction: column;
  gap: 2px;
`;

const Image = styled.img`
  width: 70px;
  height: 50px;
  border-radius: 5px;
`;
const Footer = styled.div`
  height: 22px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Icon = styled.img`
  width: 11px;
  height: 11px;
`;

// 카테고리 전체보기에서 미리볼 수 있는 글들의 컴포넌트
const ItemInTotalPage = ({ title, subText, description, footerData, img }) => {
  return (
    <>
      {' '}
      {img ? (
        <Wrapper>
          <TextWrapper>
            <Header>
              <Title>{title}</Title>
              <SubHeader>
                <Icon src={animalIcon} alt='Animal Icon' />
                <SubText>{subText}</SubText>
              </SubHeader>
            </Header>
            <Description>{description}</Description>
            <Footer>{FooterInTotalItem(footerData)}</Footer>
          </TextWrapper>
          <Image src={img} />
        </Wrapper>
      ) : (
        <Container>
          <Header>
            <Title>{title}</Title>
            <SubHeader>
              <Icon src={animalIcon} alt='Animal Icon' />
              <SubText>{subText}</SubText>
            </SubHeader>
          </Header>
          <Description>{description}</Description>
          <Footer>{FooterInTotalItem(footerData)}</Footer>
        </Container>
      )}
    </>
  );
};

export default ItemInTotalPage;
