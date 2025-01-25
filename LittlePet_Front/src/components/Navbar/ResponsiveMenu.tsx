import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

interface ResponsiveMenuProps {
  open: boolean;
}

const ResponsiveMenu: FC<ResponsiveMenuProps> = ({ open }) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  const handleLoginClick = () => navigate('/login');
  const handleOnBoarding = () => navigate('/onboarding');

  return createPortal(
    <AnimatePresence>
      {open && (
        <MotionMenu
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
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
    </AnimatePresence>,
    document.getElementById('portal-root') as HTMLElement
  );
};

export default ResponsiveMenu;

const MotionMenu = styled(motion.div)`
  position: fixed;
  top: 50px;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  color: black;
  z-index: 9999;
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
