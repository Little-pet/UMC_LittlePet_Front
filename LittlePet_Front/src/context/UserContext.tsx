import React, { createContext, useContext, useState } from 'react';
import DefaultProfileImg from '@assets/ProfileImg.svg';

interface UserProfile {
  name: string;
  phone: string;
  profileImg: string;
}

interface UserContextType {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
}

const defaultUser: UserProfile = {
  name: '소셜 로그인 이름',
  phone: '소셜 로그인 전화번호',
  profileImg: DefaultProfileImg, // 기본 이미지 경로
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(defaultUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
