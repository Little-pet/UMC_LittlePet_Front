import React, { FC } from 'react';
import styled from 'styled-components';
import { NavbarMenu } from '#/mockData/data';
import logo from '#/assets/logo_blue.svg';
import hamburger from '#/assets/hamburger.png';
import close from '#/assets/close.png';
import notifications from '#/assets/notifications.svg';
import ResponsiveMenu from './ResponsiveMenu'; // ResponsiveMenu 컴포넌트 import
import Navbar2 from './Navbar2';

const Navbar: FC = () => {
  const [open, setOpen] = React.useState<boolean>(false); // 상태 타입 정의

  return (
    <>
      <Nav>
        <NavContainer>
          {/* logo section */}
          <Logo src={logo} alt='로고'>
          
          {/* menu section */}
          <Menu>
            <MenuContainer>
              {NavbarMenu.map((item) => (
                <MenuItem key={item.id}>
                  <MenuLink href={item.link}>{item.title}</MenuLink>
                </MenuItem>   
              ))}
            </MenuContainer>
          </Menu>

          {/* Icons section */}
          <IconContainer>
            {!open && <NotificationIcon />}
          </IconContainer>
          

          {/* Mobile hamburger Menu section */}
          <HamburgerIcon onClick={() => setOpen(!open)}>
            <img src={open ? close : hamburger} alt={open ? '닫기' : '햄버거'} />
          </HamburgerIcon>
        </NavContainer>
      </Nav>
      {/* Mobile Sidebar section */}
      <ResponsiveMenu open={open} /> {/* open prop 전달 */}

     {/* 홈, 커뮤니티, 관리방법, 건강  Navbar */}
    
    {!open && ( // open 상태가 false일 때만 렌더링
        <Navbar2 />
    )}
    </>
  );
};

export default Navbar;

const Nav = styled.nav`
  border-bottom: 1px solid #D9D9D9`;

const NavContainer = styled.nav`
  display:flex;
  align-items: center;
  height: 50px;
  padding: 25px 10px;
  `;

const Logo = styled.div`
  width: 31px;
  height: auto;
  `; 

const Menu = styled.div`
  display: none; 
  @media (min-width: 768px) {
    display: block; /* md 이상에서는 block */
  }`;

const MenuContainer = styled.ul`
  display:flex;
  align-items:center;
  gap: 24px;
  text: `