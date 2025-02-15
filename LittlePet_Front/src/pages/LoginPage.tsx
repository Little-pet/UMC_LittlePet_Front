import React from 'react';
import Kakao from '#/assets/Kakao.svg';
import Naver from '#/assets/Naver.svg';
import Google from '#/assets/Google.svg';
import logo from '#/assets/logo.svg';
import back from '#/assets/back.svg';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginPage: React.FC = () => {
  console.log(
    '✅ NAVER Redirect URL:',
    import.meta.env.VITE_NAVER_REDIRECT_URI
  );

  // 카카오 로그인 요청 핸들러
  const handleKakaoLogin = () => {
    // 백엔드의 카카오 로그인 엔드포인트로 리다이렉트
    //window.location.href =
  };
  // 네이버 로그인 요청 핸들러
  const handleNaverLogin = () => {
    // 백엔드의 네이버 로그인 엔드포인트로 리다이렉트

    window.location.href =
      'http://54.180.205.177:8080/oauth2/authorization/naver';
  };
  // 구글 로그인 요청 핸들러
  const handleGoogleLogin = () => {
    // 백엔드의 구글 로그인 엔드포인트로 리다이렉트
    const GOOGLE_REDIRECT_URI: string =
      import.meta.env.VITE_GOOGLE_REDIRECT_URI || '';
    window.location.href = GOOGLE_REDIRECT_URI;
  };

  //뒤로가기 핸들러
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/');
  };

  return (
    <>
      <BackButton onClick={handleBack}>
        <img src={back} alt='back' />
      </BackButton>

      <Container>
        <Logo src={logo} alt='logo' />
        <Description>리틀펫에서 여러분의 이야기를 들려주세요!</Description>

        <LoginButtons>
          {/* 카카오 로그인 버튼 */}
          <LoginButton onClick={handleKakaoLogin}>
            <img src={Kakao} alt='카카오 로그인' />
          </LoginButton>

          {/* 네이버 로그인 버튼 */}
          <LoginButton onClick={handleNaverLogin}>
            <img src={Naver} alt='네이버 로그인' />
          </LoginButton>

          {/* 구글 로그인 버튼 */}
          <LoginButton onClick={handleGoogleLogin}>
            <img src={Google} alt='구글 로그인' />
          </LoginButton>
        </LoginButtons>
      </Container>
    </>
  );
};

export default LoginPage;

const BackButton = styled.button`
  position: absolute;
  top: 90px;
  left: 25px;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 52px;
  margin-top: 195px;
`;

const Logo = styled.img`
  width: 164px;
`;

const Description = styled.p`
  text-align: center;
  margin: 0;
`;

const LoginButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  align-items: center;
  width: 343px;
  height: 200px;
  left: 25px;
`;

const LoginButton = styled.button`
  background: none;
  border: none;
  gap: 25px;
  height: 50px;
`;
