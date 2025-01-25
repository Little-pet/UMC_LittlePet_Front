import React from 'react';
import styled from 'styled-components';

import textLogo from '@assets/TextLogo.svg';
import logo from '@assets/Logo.svg'; // 로고 파일

const SplashScreen: React.FC = () => {
  return (
    <SplashContainer>
      <StyledTextLogo src={textLogo} alt="리틀펫" />
      <StyledImgLogo src={logo} alt="logo" />
    </SplashContainer>
  );
};

export default SplashScreen;

// Styled Components
const SplashContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff; /* 배경색 */
`;

const StyledTextLogo = styled.img`
  margin-top: 220px;
  width: 200px; /* 텍스트 로고 크기 */
`;

const StyledImgLogo = styled.img`
  margin-top: 50px;
  width: 150px; /* 이미지 로고 크기 */
`;
