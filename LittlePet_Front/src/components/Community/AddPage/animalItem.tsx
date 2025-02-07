import styled from 'styled-components';

import React from 'react';

// 카테고리에 글 등록하기 페이지에서 종 카테고리 드롭다운을 누르면 나오는 팝업
const AnimalItem: React.FC<AnimalItemProps> = ({ name, icon, onClick }) => {
  return (
    <AnimalWrapper onClick={onClick}>
      <AnimalIcon src={icon} alt={`${name} Icon`} />
      <AnimalText>{name}</AnimalText>
    </AnimalWrapper>
  );
};
export default AnimalItem;
const AnimalWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  cursor: pointer;
`;

const AnimalText = styled.div`
  font-size: 14px;
  color: #262627;
  font-family: 'Pretendard-SemiBold';
`;

const AnimalIcon = styled.img`
  width: 24px;
`;
interface AnimalItemProps {
  name: string;
  icon: string;
  onClick?: () => void;
}
