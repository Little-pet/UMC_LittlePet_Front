import styled from 'styled-components';
import React from 'react';

interface TagButtonProps {
  label: string;
  onClick: () => void;
  isSelected: boolean;
}
// 카테고리에 글 등록하기 페이지에 있는 카테고리 버튼 컴포넌트(Q&A, 일상, 소개)
const TagButton: React.FC<TagButtonProps> = ({
  label,
  onClick,
  isSelected,
}) => (
  <CategoryButtonWrapper onClick={onClick} isSelected={isSelected}>
    <CategoryButtonText isSelected={isSelected}>{label}</CategoryButtonText>
  </CategoryButtonWrapper>
);
export default TagButton;
const CategoryButtonWrapper = styled.div<{ isSelected: boolean }>`
  width: 77px;
  height: 35px;
  border: 1px solid ${({ isSelected }) => (isSelected ? '#6EA8FE' : '#737373')};
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
`;

const CategoryButtonText = styled.div<{ isSelected: boolean }>`
  font-size: 14px;
  font-family: 'Pretendard-Medium';
  color: ${({ isSelected }: { isSelected: boolean }) =>
    isSelected ? '#6EA8FE' : '#737373'};
`;
