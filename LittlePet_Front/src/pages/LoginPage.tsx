import React from 'react';
import Kakao from '#/assets/KakaoLogin.png';
import Naver from '#/assets/NaverLogin.png';
import Google from '#/assets/GoogleLogin.png';
import logo from '#/assets/logo.png';
import back from '#/assets/back.png';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  // 카카오 로그인 요청 핸들러
  const handleKakaoLogin = () => {
    // 백엔드의 카카오 로그인 엔드포인트로 리다이렉트
    //window.location.href =
  };
  // 네이버 로그인 요청 핸들러
  const handleNaverLogin = () => {
    // 백엔드의 네이버 로그인 엔드포인트로 리다이렉트
    //window.location.href =
  };
  // 구글 로그인 요청 핸들러
  const handleGoogleLogin = () => {
    // 백엔드의 구글 로그인 엔드포인트로 리다이렉트
    // window.location.href =
  };

  //뒤로가기 핸들러
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/home');
  };

  return (
    <>
      <button onClick={handleBack}>
        <img src={back} alt='back' className='ml-[25px] mt-[90px]' />
      </button>

      <div className='flex flex-col items-center gap-[52px] '>
        <img src={logo} alt='logo' className='mt-[75px] w-[165px]' />
        <p className='text-text font-sans font-medium text-center'>
          리틀펫에서 여러분의 이야기를 들려주세요!
        </p>

        <div className='flex flex-col items-center gap-[25px]'>
          {/* 카카오 로그인 버튼 */}
          <button onClick={handleKakaoLogin}>
            <img src={Kakao} alt='카카오 로그인' className='h-50px' />
          </button>

          {/* 네이버 로그인 버튼 */}
          <button onClick={handleNaverLogin}>
            <img src={Naver} alt='네이버 로그인' className='h-50px' />
          </button>

          {/* 구글 로그인 버튼 */}
          <button onClick={handleGoogleLogin}>
            <img src={Google} alt='구글 로그인' className='h-50px' />
          </button>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
