import React, { FC, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

interface NavbarItem {
  id: number;
  title: string;
  link: string;
}

interface NavbarProps {
  menuItems: NavbarItem[]; // 메뉴 항목 배열
}

const Navbar: FC<NavbarProps> = ({ menuItems }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleMenuClick = (id: number, link: string) => {
    navigate(link); // 페이지 이동
  };

  return (
    <Nav>
      <NavContainer>
        <ItemContainer>
          {menuItems.map((item) => (
            <MenuItem key={item.id}>
              <MenuLink
                onClick={() => handleMenuClick(item.id, item.link)} // 페이지 이동 및 활성화 처리
                isActive={location.pathname.startsWith(item.link)}
              >
                {item.title}
              </MenuLink>
              {location.pathname.startsWith(item.link) && <ActiveItem />}
            </MenuItem>
          ))}
        </ItemContainer>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;

const Nav = styled.nav`
  border-bottom: 0.5px solid #d9d9d9;
  @media (min-width: 768px) {
    display: none;
  }
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  padding-left: 25px;
  padding-right: 25px;
  background-color: #ffffff;
`;

const ItemContainer = styled.div`
  display: flex;
  gap: 40px;
`;

const MenuItem = styled.li`
  position: relative;
  display: inline-block;
  display: flex;
  align-items: center;
  height: 45px;
  cursor: pointer;
  list-style: none;
`;

const MenuLink = styled.a<{ isActive: boolean }>`
  display: inline-block;
  color: ${({ isActive }) => (isActive ? '#6EA8FE' : 'black')};
  text-decoration: none;
`;

const ActiveItem = styled.li`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #6ea8fe;
  color: #6ea8fe;
  list-style: none;
`;
