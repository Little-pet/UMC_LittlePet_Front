import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 393px;
`;

export const ContentWrapper = styled.div`
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 50px 25px 0;
`;

export const HeaderTitle = styled.div`
  font-size: 26px;
  font-family: 'Pretendard-Bold';
`;

export const HeaderLink = styled(Link)`
  font-size: 16px;
  font-family: 'Pretendard-Medium';
  color: #737373;
  text-decoration: none;
`;

export const ItemList = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;
export const ItemListInTotal = styled.div`
  height: 90%;
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  gap: 10px;
  overflow-y: auto; /* 세로 스크롤 활성화 */
`;
