import React, { FC } from 'react';
import { NavbarMenu } from '#/mockData/data';
import logo from '#/assets/logo_blue.png';
import hamburger from '#/assets/hamburger.png';
import close from '#/assets/close.png';
import { IoMdNotificationsOutline } from 'react-icons/io';
import ResponsiveMenu from './ResponsiveMenu'; // ResponsiveMenu 컴포넌트 import
import Navbar2 from './Navbar2';

const Navbar: FC = () => {
  const [open, setOpen] = React.useState<boolean>(false); // 상태 타입 정의

  return (
    <>
      <nav className='border-b-1 border-bordercolor'>
        <div className='container flex items-center h-50px px-25px py-10px'>
          {/* logo section */}
          <div>
            <img src={logo} alt='로고' className='h-9 w-auto' />
          </div>
          {/* menu section */}
          <div className='hidden md:block ml-auto'>
            <ul className='flex items-center gap-6 text-gray-600'>
              {NavbarMenu.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.link}
                    className='inline-block py-1 px-3 cursor-pointer font-semibold'
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Icons section */}
          <div className='ml-auto md:ml-9 mr-6'>
          {!open && ( // open 상태가 false일 때만 렌더링
            <IoMdNotificationsOutline className='w-6 h-6' />
          )}
          </div>
          

          {/* Mobile hamburger Menu section */}
          <div className='md:hidden' onClick={() => setOpen(!open)}>
            {open ? (
              <img src={close} alt='닫기' className='text-4xl' />
               
            ) : (
              <img src={hamburger} alt='햄버거' className='text-4xl' /> // 햄버거 아이콘
            )}
          </div>
        </div>
      </nav>
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
