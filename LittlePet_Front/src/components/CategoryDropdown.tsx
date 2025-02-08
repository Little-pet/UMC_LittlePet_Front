import React, { useState } from 'react';
import styled from 'styled-components';
import arrowIcon from '#/assets/arrow.svg';
import AnimalItem from '#/components/Community/AddPage/animalItem';
import hamsterIcon from '@assets/animaldropdown/hamster.svg';
import rabbitIcon from '@assets/animaldropdown/rabbit.svg';
import hedgehogIcon from '@assets/animaldropdown/hedgehog.svg';

interface CategoryDropdownProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

//  동물별 아이콘을 매칭하는 객체 생성
const animalIcons: { [key: string]: string } = {
  햄스터: hamsterIcon,
  토끼: rabbitIcon,
  고슴도치: hedgehogIcon,
};

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  selectedCategory,
  onCategorySelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const animals = ['햄스터', '토끼', '고슴도치'];

  const handleCategoryClick = (name: string) => {
    onCategorySelect(name); // 부모 컴포넌트로 선택한 카테고리 전달
    setIsOpen(false); // 드롭다운 닫기
  };

  return (
    <DropdownWrapper>
      <DropdownContainer onClick={() => setIsOpen(!isOpen)}>
        {selectedCategory ? (
          <AnimalItem
            name={selectedCategory}
            icon={animalIcons[selectedCategory]}
          />
        ) : (
          <DropdownText>종 카테고리</DropdownText>
        )}
        <ArrowIcon src={arrowIcon} alt='arrow' isOpen={isOpen} />
        {isOpen && (
          <DropdownMenu>
            {animals.map((animal, index) => (
              <AnimalItem
                key={index}
                name={animal}
                icon={animalIcons[animal]}
                onClick={() => handleCategoryClick(animal)}
              />
            ))}
          </DropdownMenu>
        )}
      </DropdownContainer>
    </DropdownWrapper>
  );
};

export default CategoryDropdown;

// 스타일 정의
const DropdownWrapper = styled.div``;

const DropdownContainer = styled.div`
  display: inline-flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  padding: 6px 15px;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  box-sizing: border-box;
  cursor: pointer;
  width: auto;
  height: 35px;
  gap: 14px;
  font-family: 'Pretendard';
`;

const DropdownText = styled.div`
  font-family: 'Pretendard';
  font-size: 14px;
  color: #737373;
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 25px;
  left: 0;
  width: auto;
  background: #ffffff;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  padding: 15px 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 10;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ArrowIcon = styled(({ isOpen, ...rest }) => <img {...rest} />)`
  transition: transform 0.3s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;
