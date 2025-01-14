import React, { FC, useState } from 'react';

interface NavbarProps {
  menuItems: string[]; // 메뉴 항목 배열
}

const Navbar: FC<NavbarProps> = ({ menuItems }) => {
  const [active, setActive] = useState<string>(menuItems[0]); // 초기 활성화 상태

  const handleMenuClick = (item: string) => {
    setActive(item); // 활성화 상태 업데이트
  };

  return (
    <nav className='border-b border-bordercolor'>
      <div className='container flex justify-center items-center h-[45px] px-25'>
        <div className='flex gap-10'>
          {menuItems.map((item) => (
            <div
              key={item}
              onClick={() => handleMenuClick(item)}
              className={`relative inline-block items-center flex h-[45px] cursor-pointer font-medium text-center ${
                active === item ? 'text-primary' : 'text-text'
              }`}
            >
              <span className='inline-block'>{item}</span>
              {active === item && (
                <div className='absolute bottom-0 left-0 w-full h-[2px] bg-primary'></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
