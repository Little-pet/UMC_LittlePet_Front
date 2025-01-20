import React, { FC } from 'react';
import styled from 'styled-components';
import { NavbarTopMenu, NavbarMainMenu } from '#/mockData/data';
import logo from '#/assets/logo_blue.svg';
import hamburger from '#/assets/hamburger.svg';
import close from '#/assets/close.svg';
import notifications from '#/assets/notifications.svg';
import ResponsiveMenu from './ResponsiveMenu'; // ResponsiveMenu 컴포넌트 import
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';

const NavbarTop: FC = () => {
  const [open, setOpen] = React.useState<boolean>(false); // 상태 타입 정의
  const location = useLocation();
  const isMyPage = location.pathname === '/mypage';
  const isEditProfile = location.pathname === '/edit-profile';
  const isEditPetProfile = location.pathname === '/pet-register';
  return (
    <>
      <Nav>
        <NavContainer>
          {/* logo section */}
          <Logo src={logo} alt='로고' />

          {/* menu section */}
          <Menu>
            <MenuContainer>
              {NavbarTopMenu.map((item) => (
                <MenuItem key={item.id}>
                  <MenuLink href={item.link}>{item.title}</MenuLink>
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
        </NavContainer>
      </Nav>
      {/* Mobile Sidebar section */}
      <ResponsiveMenu open={open} />

      {/* 홈, 커뮤니티, 관리방법, 건강  Navbar */}
      {!open && !isMyPage && !isEditProfile && !isEditPetProfile &&(
        // open 상태가 false, 마이페이지가 아닐 때만 렌더링
        <Navbar menuItems={NavbarMainMenu} />
      )}
    </>
  );
};

export default NavbarTop;

const Nav = styled.nav`
  border-bottom: 0.5px solid #d9d9d9;
  margin: 0;
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  padding: 10px 25px;
  box-sizing: border-box;
  margin: 0;
`;

const Logo = styled.img`
  width: 31px;
  height: auto;
`;

const Menu = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: block; /* md 이상에서는 block */
  }
`;

const MenuContainer = styled.ul`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const MenuItem = styled.li`
  list-style: none;
`;

const MenuLink = styled.a`
  display: inline-block;
  padding: 4px 12px;
  cursor: pointer;
  font-family: 'Pretendard-Medium';
  text-decoration: none;
  color: #262627;
`;

const IconContainer = styled.div`
  margin-left: auto;
  margin-right: 24px;
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
