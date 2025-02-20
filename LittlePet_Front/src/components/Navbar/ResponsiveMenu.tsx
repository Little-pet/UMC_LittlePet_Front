import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '#/store/AuthStore';

interface ResponsiveMenuProps {
  open: boolean;
  onClose: () => void;
}

const ResponsiveMenu: FC<ResponsiveMenuProps> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);

  const handleLoginOrMyPageClick = () => {
    onClose();
    navigate(isLoggedIn ? '/mypage' : '/login');
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <MotionMenu
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
        >
          <MenuContainer>
            <MenuButton onClick={handleLoginOrMyPageClick}>
              {isLoggedIn ? '마이페이지' : '로그인 / 회원가입'}
            </MenuButton>
            <MenuItem>ABOUT</MenuItem>
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
  z-index: 20;
  @media (min-width: 800px) {
    /* 태블릿 및 PC 화면에서는 작은 팝업으로 변경 */
    width: 272px;
    height: auto;
    box-shadow: 0px 2px 5px 0px #00000026;
    border: 1px solid #e6e6e6;
    border-radius: 10px;
    right: 20px;
    top: 92px;
    z-index: 9999;
  }
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
  &hover: {
    color: #6ea8fe;
  }
`;
