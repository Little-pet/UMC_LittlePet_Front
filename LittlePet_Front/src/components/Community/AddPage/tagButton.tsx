import styled from 'styled-components';
import React from 'react';

interface TagButtonProps {
  label: string;
  icon?: string | null;
  onClick: () => void;
  isSelected: boolean;
  type?: string;
}
// 카테고리에 글 등록하기 페이지에 있는 카테고리 버튼 컴포넌트(Q&A, 일상, 소개)
const TagButton: React.FC<TagButtonProps> = ({
  label,
  icon,
  onClick,
  isSelected,
  type,
}) => (
  <CategoryButtonWrapper onClick={onClick} isSelected={isSelected}>
    <CategoryButtonText isSelected={isSelected}>
      {label}
      {icon && <SpanIcon gender={type}>{icon}</SpanIcon>}
    </CategoryButtonText>
  </CategoryButtonWrapper>
);
export default TagButton;
const CategoryButtonWrapper = styled.div<{ isSelected: boolean }>`
  width: 100%;
  height: 35px;
  border: 1px solid ${({ isSelected }) => (isSelected ? '#6EA8FE' : '#E6E6E6')};
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
`;

const CategoryButtonText = styled.div<{ isSelected: boolean }>`
  font-size: 14px;
  font-family: 'Pretendard';
  color: #737373;
`;

const SpanIcon = styled.span<{ gender: string }>`
  font-weight: 700;
  font-size: 14px;
  line-height: 22px;
  color: ${({ gender }) =>
    gender === 'female'
      ? '#FF5A5A'
      : gender === 'male'
        ? '#6EA8FE'
        : '#737373'};
`;
