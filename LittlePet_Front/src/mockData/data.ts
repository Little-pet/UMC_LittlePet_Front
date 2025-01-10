export interface NavbarItem {
  id: number;
  title: string;
  link: string;
}

export const NavbarMenu: NavbarItem[] = [
  {
    id: 1,
    title: '로그인 / 회원가입',
    link: '/',
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
