import React, { FC, useState } from 'react';

const Navbar2: FC = () => {
  const [active, setActive] = useState<string>('홈'); // 활성화된 메뉴 상태

  const menuItems: string[] = ['홈', '커뮤니티', '관리방법', '건강']; // 메뉴 항목

  return (
    <nav className='border-b border-gray-300'>
      <div className='container flex justify-center items-center h-[45px] px-25'>
        <div className='flex gap-10'>
          {menuItems.map((item) => (
            <div
              key={item}
              onClick={() => setActive(item)}
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

export default Navbar2;

