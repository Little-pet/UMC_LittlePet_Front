import React, { FC } from 'react';
import styled from 'styled-components';
import { NavbarMainMenu } from '#/mockData/data';
import logo from '#/assets/logo_blue.svg';
import logoBlack from '#/assets/logo.svg';
import hamburger from '#/assets/hamburger.svg';
import close from '#/assets/close.svg';
import ResponsiveMenu from './ResponsiveMenu'; // ResponsiveMenu 컴포넌트 import
import Navbar from './Navbar';
import littlePet from '#/assets/리틀펫.svg';
import { useLocation, useNavigate } from 'react-router-dom';

const NavbarTop: FC = () => {
  const [open, setOpen] = React.useState<boolean>(false); // 상태 타입 정의
  const location = useLocation();
  const navigate = useNavigate();

  const isMyPage = location.pathname === '/mypage';
  const isEditProfile = location.pathname === '/edit-profile';
  const isRegisterPet = location.pathname === '/pet-register';
  const isEditPetProfile = location.pathname.startsWith('/edit-pet/');
  const handleMenuClick = (link: string) => {
    navigate(link);
  };

  return (
    <>
      <Nav>
        <div
          onClick={() => navigate('/home')}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Logo src={logo} alt='로고' />
          <LogoBlack src={logoBlack} alt='로고' />
          <Img src={littlePet} />
        </div>

        <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
          {/*  PC에서는 네비게이션 메뉴 항상 표시 */}
          <Menu>
            {!open && (
              <MenuContainer>
                {NavbarMainMenu.map((item) => (
                  <MenuItem key={item.id}>
                    <MenuLink
                      onClick={() => handleMenuClick(item.link)} // 페이지 이동 및 활성화 처리
                      isActive={
                        location.pathname === '/'
                          ? item.link === '/home'
                          : location.pathname.startsWith(item.link)
                      }
                    >
                      {item.title}
                    </MenuLink>
                  </MenuItem>
                ))}
              </MenuContainer>
            )}
          </Menu>

          {/* 햄버거 아이콘: 모바일에서는 `X`로 변경되지만, PC에서는 그대로 유지 */}
          <HamburgerIcon onClick={() => setOpen(!open)}>
            <img
              src={window.innerWidth < 768 && open ? close : hamburger}
              alt={open ? '닫기' : '햄버거'}
            />
          </HamburgerIcon>
        </div>
      </Nav>

      {/* 모바일에서는 open 상태일 때 네비게이션 숨김, PC에서는 항상 보이게 */}
      {!isMyPage && !isEditProfile && !isEditPetProfile && !isRegisterPet && (
        <DesktopNavbarWrapper open={open}>
          <Navbar menuItems={NavbarMainMenu} />
        </DesktopNavbarWrapper>
      )}

      {/* 📌 모바일에서만 사이드바 메뉴 표시 */}
      <ResponsiveMenu open={open} />
    </>
  );
};

export default NavbarTop;

const Img = styled.img`
  width: 60px;
  margin-left: 12px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const Nav = styled.nav`
  border-bottom: 0.5px solid #d9d9d9;
  margin: 0;
  width: 100%;
  height: 50px;
  padding: 10px 25px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (min-width: 768px) {
    height: 104px;
  }
`;

const Logo = styled.img`
  width: 31px;
  height: auto;
  @media (min-width: 768px) {
    display: none;
  }
`;

const LogoBlack = styled.img`
  width: 48px;
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
  @media (min-width: 768px) {
    font-size: 22px;
    font-weight: 600;
  }
`;

const MenuLink = styled.a<{ isActive: boolean }>`
  display: inline-block;
  padding: 4px 12px;
  cursor: pointer;
  font-family: 'Pretendard-Medium';
  text-decoration: none;
  color: ${({ isActive }) => (isActive ? '#6EA8FE' : '#262627')};
`;

/*  PC에서는 항상 보이고, 모바일에서는 open 상태일 때 숨김 */
const DesktopNavbarWrapper = styled.div<{ open: boolean }>`
  @media (max-width: 768px) {
    display: ${({ open }) => (open ? 'none' : 'block')};
  }
`;

const HamburgerIcon = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 22px;
  height: auto;
  color: #d9d9d9;
`;
