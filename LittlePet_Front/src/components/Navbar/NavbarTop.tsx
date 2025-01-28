import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { NavbarTopMenu, NavbarMainMenu } from '#/mockData/data';
import logo from '#/assets/logo_blue.svg';
import logoBlack from '#/assets/logo.svg';
import hamburger from '#/assets/hamburger.svg';
import close from '#/assets/close.svg';
import notifications from '#/assets/notifications.svg';
import ResponsiveMenu from './ResponsiveMenu'; // ResponsiveMenu 컴포넌트 import
import Navbar from './Navbar';
import littlePet from '#/assets/리틀펫.svg';
import { useLocation, useNavigate } from 'react-router-dom';

const NavbarTop: FC = () => {
  const [open, setOpen] = React.useState<boolean>(false); // 상태 타입 정의
  const [active, setActive] = useState<number>(NavbarMainMenu[0].id); // 초기 활성화 상태
  const location = useLocation();
  const navigate = useNavigate();
  const isMyPage = location.pathname === '/mypage';
  const isEditProfile = location.pathname === '/edit-profile';
  const isRegisterPet = location.pathname === '/pet-register';
  const isEditPetProfile = location.pathname.startsWith('/edit-pet/');
  const handleMenuClick = (id: number) => {
    setActive(id); // 활성화 상태 업데이트
  };
  return (
    <>
      <Nav>
        {/*  <NavContainer> */}
        <div
          onClick={() => navigate('/')}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          {/* logo section */}
          <Logo src={logo} alt='로고' />
          <LogoBlack src={logoBlack} alt='로고' />
          <Img src={littlePet} />
        </div>

        <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
          {/* menu section */}
          <Menu>
            <MenuContainer>
              {NavbarMainMenu.map((item) => (
                <MenuItem key={item.id}>
                  <MenuLink
                    href={item.link}
                    onClick={() => handleMenuClick(item.id)} // 페이지 이동 및 활성화 처리
                    isActive={active === item.id}
                  >
                    {item.title}
                  </MenuLink>
                </MenuItem>
              ))}
            </MenuContainer>
          </Menu>
          {/* Icons section */}
          <IconContainer>
            {!open && <NotificationIcon src={notifications} alt='알림' />}
          </IconContainer>

          {/* Mobile hamburger Menu section */}
          <HamburgerIcon onClick={() => setOpen(!open)}>
            <img
              src={open ? close : hamburger}
              alt={open ? '닫기' : '햄버거'}
            />
          </HamburgerIcon>
        </div>
        {/*  </NavContainer> */}
      </Nav>
      {/* Mobile Sidebar section */}
      <ResponsiveMenu open={open} />

      {/* 홈, 커뮤니티, 관리방법, 건강  Navbar */}
      {!open &&
        !isMyPage &&
        !isEditProfile &&
        !isEditPetProfile &&
        !isRegisterPet && (
          // open 상태가 false, 마이페이지가 아닐 때만 렌더링
          <Navbar menuItems={NavbarMainMenu} />
        )}
    </>
  );
};

export default NavbarTop;
const Img = styled.img`
  width: 40px;
  margin-left: 8px;
  @media (max-width: 768px) {
    display: none;
  }
`;
const Nav = styled.nav`
  border-bottom: 0.5px solid #d9d9d9;
  margin: 0;
  width: 100%;
  padding: 10px 25px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  width: 31px;
  height: auto;
  @media (min-width: 768px) {
    display: none;
  }
`;
const LogoBlack = styled.img`
  width: 31px;
  height: auto;
  @media (max-width: 768px) {
    display: none;
  }
`;
const Menu = styled.div`
  display: none;
  height: 50px;
  @media (min-width: 768px) {
    display: flex;
  }
`;

const MenuContainer = styled.ul`
  display: flex;
  align-items: center;
  gap: 24px;
  margin: 0;
`;

const MenuItem = styled.li`
  list-style: none;
`;

const MenuLink = styled.a<{ isActive: boolean }>`
  display: inline-block;
  padding: 4px 12px;
  cursor: pointer;
  font-family: 'Pretendard-Medium';
  text-decoration: none;
  color: ${({ isActive }) => (isActive ? '#6EA8FE' : 'black')};
`;

const IconContainer = styled.div`
  @media (min-width: 768px) {
    display: none;
  }
`;

const NotificationIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const HamburgerIcon = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 22px;
  height: auto;
  color: #d9d9d9;
`;
