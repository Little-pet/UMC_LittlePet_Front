import { motion, AnimatePresence } from 'framer-motion';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface ResponsiveMenuProps {
  open: boolean; // Props로 open 상태를 받음
}

const ResponsiveMenu: FC<ResponsiveMenuProps> = ({ open }) => {
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  const handleLoginClick = () => {
    navigate('/login'); // '/login' 경로로 이동
  };
  
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className='fixed right-0 w-full h-full z-20 text-black'
        >
          <div>
            <ul className='flex flex-col justify-center items-start gap-12 px-25px py-50px'>
              <button className='text-22px font-500' onClick={handleLoginClick}>로그인 / 회원가입</button>
              <li className='text-22px font-500'>ABOUT</li>
              <li className='text-22px font-500'>CONTACT</li>
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ResponsiveMenu;
