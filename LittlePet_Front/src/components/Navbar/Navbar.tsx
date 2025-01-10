import React, { FC } from 'react';
import { NavbarMenu } from '#/mockData/data';
import logo from '#/assets/logo_blue.png';
import hamburger from '#/assets/hamburger.png';
import close from '#/assets/close.png';
import { IoMdNotificationsOutline } from 'react-icons/io';
import ResponsiveMenu from './ResponsiveMenu'; // ResponsiveMenu 컴포넌트 import

const Navbar: FC = () => {
  const [open, setOpen] = React.useState<boolean>(false); // 상태 타입 정의

  return (
    <>
      <nav>
        <div className='container flex justify-between items-center px-10px py-25px'>
          {/* logo section */}
          <div>
            <img src={logo} alt='로고' className='h-9 w-auto' />
          </div>
          {/* menu section */}
          <div className='hidden md:block'>
            <ul className='flex items-center gap-6 text-gray-600'>
              {NavbarMenu.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.link}
                    className='inline-block py-1 px-3 hover:text-primary font-semibold'
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Icons section */}
          <IoMdNotificationsOutline className='w-6 h-6 hidden md:block' />

          {/* Mobile hamburger Menu section */}
          <div className='md:hidden' onClick={() => setOpen(!open)}>
            {open ? (
              <img src={close} alt='닫기' className='text-4xl' /> // X 아이콘
            ) : (
              <img src={hamburger} alt='햄버거' className='text-4xl' /> // 햄버거 아이콘
            )}
          </div>
        </div>
      </nav>
      {/* Mobile Sidebar section */}
      <ResponsiveMenu open={open} /> {/* open prop 전달 */}
    </>
  );
};

export default Navbar;
