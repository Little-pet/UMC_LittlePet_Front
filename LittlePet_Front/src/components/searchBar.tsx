import styled from 'styled-components';
import searchIcon from '#/assets/돋보기.svg';
import React from 'react';

interface SearchBarProps {
  placeholder: string;
}
// 카테고리에 있는 검색 버튼
const SearchBar: React.FC<SearchBarProps> = ({ placeholder }) => {
  return (
    <SearchContainer>
      <SearchIcon src={searchIcon} alt='Search Icon' />
      <SearchInput type='text' placeholder={placeholder} />
    </SearchContainer>
  );
};

export default SearchBar;

const SearchContainer = styled.div`
  border: 2px solid #6ea8fe;
  width: 100%;
  margin: 0 25px;
  height: 48px;
  border-radius: 5px;
  padding: 10px 15px;
  box-sizing: border-box;
  margin-top: 30px;
  display: flex;
  align-items: center;
  @media (min-width: 800px) {
    margin: 0 96px;
    margin-top: 30px;
  }
`;

const SearchIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const SearchInput = styled.input`
  padding-left: 15px;
  border: none;
  outline: none;
  flex: 1;
  font-size: 14px;
  font-family: 'Pretendard-SemiBold';
  color: #737373;
`;
