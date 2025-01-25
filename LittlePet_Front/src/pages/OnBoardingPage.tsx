import React from 'react';
import logo from '#/assets/logo.svg';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const OnBoardingPage: React.FC = () => {
  //뒤로가기 핸들러
  const navigate = useNavigate();
  const handleRegister = () => {
    navigate('/mypage'); // 마이페이지로
  };
  const handleHome = () => {
    navigate('/'); // 홈으로
  };

  return (
    <Container>
      <Logo src={logo} alt='logo' />
      <Description>
        리틀펫의 회원이 되신 걸 환영합니다! <br />
        반려 소동물을 등록해볼까요?
      </Description>

      <ButtonContainer>
        {/* 반려동물 등록 버튼 */}
        <RegisterButton onClick={handleRegister}>
          나의 반려 소동물 등록하기
        </RegisterButton>

        {/* 홈으로 이동하는 버튼튼 */}
        <HomeButton onClick={handleHome}>일단 먼저 둘러 볼게요</HomeButton>
      </ButtonContainer>
    </Container>
  );
};

export default OnBoardingPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 52px;
`;

const Logo = styled.img`
  width: 164px;
  margin-top: 195px;
`;

const Description = styled.p`
  text-align: center;
  margin: 0;
  font-family: 'Pretendard';
  line-height: 1.5;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  align-items: center;
`;

const RegisterButton = styled.button`
  background-color: #6ea8fe;
  color: white;
  padding: 10px 15px;
  width: 343px;
  height: 50px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  font-family: 'Pretendard';
`;

const HomeButton = styled.button`
  background: none;
  border: none;
  outline: none;
  padding: 0;
  color: #737373;
  border-bottom: 1px solid;
  font-family: 'Pretendard';
  font-size: 16px;
  cursor: pointer;
`;
