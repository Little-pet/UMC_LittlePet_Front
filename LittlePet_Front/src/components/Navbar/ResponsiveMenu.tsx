import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

interface ResponsiveMenuProps {
  open: boolean;
}

const ResponsiveMenu: FC<ResponsiveMenuProps> = ({ open }) => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleOnBoarding = () => {
    navigate('/onboarding');
  };

  return (
    <AnimatePresence>
      {open && (
        <MotionMenu
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
        >
          <MenuContainer>
            <MenuButton onClick={handleLoginClick}>
              로그인 / 회원가입
            </MenuButton>
            <MenuItem onClick={handleOnBoarding}>ABOUT</MenuItem>
            <MenuItem>CONTACT</MenuItem>
          </MenuContainer>
        </MotionMenu>
      )}
    </AnimatePresence>
  );
};

export default ResponsiveMenu;

// Styled Components
const MotionMenu = styled(motion.div)`
  position: fixed;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
  background-color: #fff; /* 배경색 추가 */
  color: black;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 50px 25px;
  height: 266px;
  box-sizing: border-box;
  gap: 50px;
`;

const MenuButton = styled.button`
  font-size: 22px;
  font-weight: 500;
  font-family: 'Pretendard';
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  padding: 0;
`;

const MenuItem = styled.li`
  font-size: 22px;
  font-weight: 500;
  cursor: pointer;
  list-style: none;
`;
