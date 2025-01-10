import { motion, AnimatePresence } from 'framer-motion';
import React, { FC } from 'react';

interface ResponsiveMenuProps {
  open: boolean; // Props로 open 상태를 받음
}

const ResponsiveMenu: FC<ResponsiveMenuProps> = ({ open }) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className='absolute top-20 right-0 w-full h-full z-20 text-black bg-primary'
        >
          <div>
            <ul className='flex flex-col justify-center items-start gap-12 px-25px py-50px'>
              <li className='text-22px font-500'>로그인 / 회원가입</li>
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
