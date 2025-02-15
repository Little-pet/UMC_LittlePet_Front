import React from 'react';
import styled from 'styled-components';

interface SelectableButtonProps {
  name: string;
  options: {
    id: number;
    label: string;
    icon: string;
  }[];
  selectedOption: string | null;
  onSelect: (name: string, value: string) => void;
}

const SelectableButton: React.FC<SelectableButtonProps> = ({
  name,
  options,
  selectedOption,
  onSelect,
}) => {
  return (
    <ButtonGroup>
      {options.map((option) => {
        return (
          <Item key={option.id} onClick={() => onSelect(name, option.label)}>
            <IconWrapper isSelected={selectedOption === option.label}>
              <Icon src={option.icon} alt={option.label} />
            </IconWrapper>
            <Label isSelected={selectedOption === option.label}>
              {option.label}
            </Label>
          </Item>
        );
      })}
    </ButtonGroup>
  );
};

export default SelectableButton;

// 스타일 컴포넌트
const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 19px;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: center;
  cursor: pointer;
`;

const IconWrapper = styled.div<{ isSelected: boolean }>`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: ${({ isSelected }) =>
    isSelected ? '2px solid #6EA8FE' : '2px solid #e6e6e6'};
  border-radius: 10px;
`;

const Icon = styled.img`
  width: 26px;
  height: 26px;
`;

const Label = styled.span<{ isSelected: boolean }>`
  font-size: 8px;
  font-weight: 600;
  color: ${({ isSelected }) => (isSelected ? '#6EA8FE' : '#262627')};
`;
