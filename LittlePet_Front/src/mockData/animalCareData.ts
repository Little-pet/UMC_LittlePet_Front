export const mainCategories = ['전체', '설치류', '파충류', '조류', '기타'];
import img1 from '@assets/animals/거북.svg';
import img2 from '@assets/animals/고슴도치.svg';
import img3 from '@assets/animals/기니피그.svg';
import img4 from '@assets/animals/데구.svg';
import img5 from '@assets/animals/도마뱀.svg';
import img6 from '@assets/animals/뱀.svg';
import img7 from '@assets/animals/십자매.svg';
import img8 from '@assets/animals/슈가글라이더.svg';
import img9 from '@assets/animals/앵무새.svg';
import img10 from '@assets/animals/저빌.svg';
import img11 from '@assets/animals/친칠라.svg';
import img12 from '@assets/animals/카나리아.svg';
import img13 from '@assets/animals/토끼.svg';
import img14 from '@assets/animals/프레리도그.svg';
import img15 from '@assets/animals/페럿.svg';
import img16 from '@assets/animals/햄스터.svg';

export const animals = [
  { id: 1, name: '거북', image: img1, link: '' },
  { id: 2, name: '고슴도치', image: img2, link: '/caremethod/detail/hedgehog' },
  { id: 3, name: '기니피그', image: img3, link: '' },
  { id: 4, name: '데구', image: img4, link: '' },
  { id: 5, name: '도마뱀', image: img5, link: '' },
  { id: 6, name: '뱀', image: img6, link: '' },
  { id: 7, name: '십자매', image: img7, link: '' },
  {
    id: 8,
    name: '슈가글라이더',
    image: img8,
    link: '',
  },
  { id: 9, name: '앵무새', image: img9, link: '' },
  { id: 10, name: '저빌', image: img10, link: '' },
  { id: 11, name: '친칠라', image: img11, link: '' },
  {
    id: 12,
    name: '카나리아',
    image: img12,
    link: '',
  },
  { id: 13, name: '토끼', image: img13, link: '/caremethod/detail/rabbit' },
  {
    id: 14,
    name: '프레리도그',
    image: img14,
    link: '',
  },
  { id: 15, name: '페럿', image: img15, link: '' },
  {
    id: 16,
    name: '햄스터',
    image: img16,

    link: '/caremethod/detail/hamster',
  },
];

export const subCategories = {
  전체: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
  설치류: [3, 4, 10, 11, 14, 16],
  파충류: [1, 5, 6],
  조류: [7, 9, 12],
  기타: [2, 8, 13, 15],
};
