import styled from 'styled-components';
import searchIcon from '../assets/돋보기.svg';

const SearchContainer = styled.div`
  border: 2px solid #6ea8fe;
  width: 343px;
  height: 48px;
  border-radius: 5px;
  padding: 10px 15px;
  box-sizing: border-box;
  margin-top: 30px;
  display: flex;
  align-items: center;
`;

const SearchIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const SearchText = styled.div`
  color: #737373;
  font-size: 14px;
  font-family: 'Pretendard';
  font-weight: 600;
  margin-left: 10px;
`;
// 카테고리에 있는 검색 버튼
const SearchBar = ({ text }) => {
  return (
    <SearchContainer>
      <SearchIcon src={searchIcon} alt='Search Icon' />
      <SearchText>{text}</SearchText>
    </SearchContainer>
  );
};

export default SearchBar;
