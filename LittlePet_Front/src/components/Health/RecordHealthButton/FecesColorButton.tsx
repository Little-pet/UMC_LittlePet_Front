import React from 'react';
import styled from 'styled-components';

interface SelectableButtonProps {
  name: string;
  options: {
    id: number;
    label: string;
    color: string;
  }[];
  selectedOption: number | null;
  onSelect: (name: string, value: number) => void;
}

const SelectableButton: React.FC<SelectableButtonProps> = ({
  name,
  options,
  selectedOption,
  onSelect,
}) => {
  return (
    <ButtonGroup>
      {options.map((option) => (
        <Item key={option.id} onClick={() => onSelect(name, option.id)}>
          {option.color && (
            <ColorBox
              color={option.color}
              isSelected={selectedOption === option.id}
            />
          )}
          <Label isSelected={selectedOption === option.id}>
            {option.label}
          </Label>
        </Item>
      ))}
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
  padding: 0 12.5px;
`;

const ColorBox = styled.div<{ color: string; isSelected: boolean }>`
  width: 25px;
  height: 25px;
  background-color: ${({ color }) => color};
  border: ${({ isSelected }) => (isSelected ? '2px solid #6EA8FE' : 'none')};
  border-radius: 50%;
`;

const Label = styled.span<{ isSelected: boolean }>`
  font-size: 8px;
  font-weight: 600;
  color: ${({ isSelected }) => (isSelected ? '#6EA8FE' : '#262627')};
`;
