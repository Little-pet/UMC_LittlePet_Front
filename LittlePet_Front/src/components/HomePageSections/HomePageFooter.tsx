import React from 'react';
import styled from 'styled-components';
import logo from '#/assets/logo.svg';

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <LogoImg src={logo} />
      <Text>
        개인정보처리방침 | 이용약관 | For Your Little Pets
        <br />
        (주)리틀펫 | 대표자: 조민경 | 사업자번호: 123-456-789 | 사업자 정보
        확인개인정보보호책임자: 조민경 | 이메일: info@LittlePet.com
        <br />© LittlePet. ALL RIGHTS RESERVED
      </Text>
    </FooterContainer>
  );
};
export default Footer;

const FooterContainer = styled.div`
  background-color: #262627;
  width: 100%;
  height: 312px;
  @media (max-width: 800px) {
    display: none;
  }
`;

const LogoImg = styled.div`
  width: 56px;
  height: 56px;
  background-color: #ffffff;
  box-shadow: 0px 4px 4px 0px #00000040;
  border-radius: 10px;
  margin-top: 53px;
  margin-left: 60px;
`;

const Text = styled.p`
  margin-left: 60px;
  font-weight: 600;
  line-height: 35px;
  fon-size: 20px;
  color: #ffffff;
`;
