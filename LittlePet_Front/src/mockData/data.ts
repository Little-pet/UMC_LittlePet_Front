export interface NavbarItem {
  id: number;
  title: string;
  link: string;
}

export const NavbarTopMenu: NavbarItem[] = [
  {
    id: 1,
    title: '로그인 / 회원가입',
    link: '/login',
  },
  {
    id: 2,
    title: 'ABOUT',
    link: '#',
  },
  {
    id: 3,
    title: 'CONTACT',
    link: '#',
  },
];

export const NavbarMainMenu: NavbarItem[] = [
  {
    id: 1,
    title: '홈',
    link: '/home',
  },
  {
    id: 2,
    title: '커뮤니티',
    link: '/health',
  },
  {
    id: 3,
    title: '관리방법',
    link: '/care',
  },
  {
    id: 4,
    title: '건강',
    link: '/health',
  },
];
