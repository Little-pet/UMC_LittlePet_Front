import React from 'react';
import styled from 'styled-components';

interface SelectableButtonGroupProps {
  name: string;
  options: { id: string; label: string }[];
  selectedValue: string;
  onSelect: (name: string, value: string) => void;
}

const SelectableButtonGroup: React.FC<SelectableButtonGroupProps> = ({
  name,
  options,
  selectedValue,
  onSelect,
}) => {
  return (
    <ButtonGroup>
      {options.map((option) => (
        <Button
          key={option.id}
          onClick={() => onSelect(name, option.id)}
          selected={selectedValue === option.id}
        >
          {option.label}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default SelectableButtonGroup;

// 스타일 컴포넌트
const ButtonGroup = styled.div`
  display: flex;

  gap: 8px;
  height: 18px;
`;

const Button = styled.button<{ selected: boolean }>`
  padding: 4px 12px;
  font-size: 10px;
  font-weight: 600;
  font-family: 'Pretendard';
  width: 42px;
  color: #737373;
  border-radius: 30px;
  background-color: ${({ selected }) => (selected ? '#6EA8FE33' : '#E6E6E680')};
  color: ${({ selected }) => (selected ? '#6EA8FE' : '#737373')};
  border: none;
  cursor: pointer;
`;
