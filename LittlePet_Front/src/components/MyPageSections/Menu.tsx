import React from 'react';
import styled from 'styled-components';
import Notice from '@assets/Notice.svg';
import Logout from '@assets/Logout.svg';
import TermsOfService from '@assets/이용약관.svg';
import CancelAccount from '@assets/CancelAccount.svg';

// 메뉴 항목 데이터 타입 정의
interface MenuItemProps {
  icon: React.ReactNode;
  text: string;
}

// 메뉴 항목 컴포넌트
const MenuItem: React.FC<MenuItemProps> = ({ icon, text }) => {
  return (
    <ItemContainer>
      {icon}
      <ItemText>{text}</ItemText>
    </ItemContainer>
  );
};

const SettingsPage: React.FC = () => {
  return (
    <Container>
      <Section>
        <SectionTitle>도움말</SectionTitle>
        <MenuItem icon={<img src={Notice} alt='공지사항' />} text='공지사항' />
        <MenuItem
          icon={<img src={TermsOfService} alt='이용약관' />}
          text='이용약관'
        />
      </Section>

      <Section>
        <SectionTitle>계정 설정</SectionTitle>
        <MenuItem icon={<img src={Logout} alt='로그아웃' />} text='로그아웃' />
        <MenuItem
          icon={<img src={CancelAccount} alt='회원탈퇴' />}
          text='회원탈퇴'
        />
      </Section>
    </Container>
  );
};

export default SettingsPage;

// 스타일링
const Container = styled.div`
  width: 100%;
  font-family: 'Pretendard';
  display: flex;
  flex-direction: column;
  gap: 29px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`;

const SectionTitle = styled.div`
  font-size: 14px;
  color: #737373;
  font-weight: 600;
  height: 32px;
  border-bottom: 1px solid #e6e6e6;
  padding-top: 5px;
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 22px;
`;

const ItemText = styled.div`
  margin-left: 10px;
  font-size: 16px;
`;
