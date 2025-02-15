import React, { useState, useEffect } from 'react';
import Kakao from '#/assets/Kakao.svg';
import Naver from '#/assets/Naver.svg';
import Google from '#/assets/Google.svg';
import logo from '#/assets/logo.svg';
import back from '#/assets/back.svg';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
const LoginPage: React.FC = () => {
  const [isLoggiedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);

  //로그인 상태 확인
  const checkLoginStatus = async () => {
    try {
      const response = await axios.get(
        'https://umclittlepet.shop/api/auth/status',
        {
          withCredentials: true, // 쿠키 포함하여 요청
        }
      );
      console.log('로그인 상태', response.data);

      if (response.data.loggedIn) {
        setIsLoggedIn(true);
        setUserInfo(response.data.user);
      } else {
        setIsLoggedIn(false);
        setUserInfo(null);
      }
    } catch (error) {
      console.error('로그인 상태 확인 중 오류 발생:', error);
      setIsLoggedIn(false);
    }
  };

  // 로그인 페이지 로드 시 로그인 상태 확인
  useEffect(() => {
    console.log(' useEffect 실행됨!');
    checkLoginStatus(); // 항상 실행되도록 변경
  }, []);

  // 카카오 로그인 요청 핸들러
  const handleKakaoLogin = () => {
    // 백엔드의 카카오 로그인 엔드포인트로 리다이렉트
    window.location.href =
      'https://umclittlepet.shop/oauth2/authorization/kakao';
  };
  // 네이버 로그인 요청 핸들러
  const handleNaverLogin = () => {
    // 백엔드의 네이버 로그인 엔드포인트로 리다이렉트

    window.location.href =
      'https://umclittlepet.shop/oauth2/authorization/naver';
  };
  // 구글 로그인 요청 핸들러
  const handleGoogleLogin = () => {
    // 백엔드의 구글 로그인 엔드포인트로 리다이렉트
    window.location.href =
      'https://umclittlepet.shop/oauth2/authorization/google';
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
