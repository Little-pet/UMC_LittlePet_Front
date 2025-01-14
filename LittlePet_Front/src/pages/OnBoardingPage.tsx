import React from 'react';
import logo from '#/assets/logo.svg';
import { useNavigate } from 'react-router-dom';

const OnBoardingPage: React.FC = () => {
  const navigate = useNavigate();

  // 버튼 클릭 시 다른 페이지로 이동하는 핸들러
  const handleRegister = () => {
    navigate('/mypage'); // 마이페이지로
  };

  const handleHome = () => {
    navigate('/home'); // 홈으로
  };

  return (
    <div className='flex flex-col items-center gap-[52px] '>
      <img src={logo} alt='logo' className='mt-[195px] w-[165px]' />
      <p className='text-text font-sans font-medium text-center'>
        리틀펫의 회원이 되신 걸 환영합니다! <br />
        반려 소동물을 등록해볼까요?
      </p>

      <div className='flex flex-col items-center gap-[25px]'>
        {/* 반려동물 등록하는 버튼 */}
        <button
          onClick={handleRegister}
          className='bg-primary text-white py-[10px] w-[343px] rounded-[5px]'
        >
          나의 반려 소동물 등록하기
        </button>

        {/* 홈으로 이동하는 버튼 */}
        <p onClick={handleHome} className='border-b border-text'>
          일단 먼저 둘러 볼게요
        </p>
      </div>
    </div>
  );
};

export default OnBoardingPage;
