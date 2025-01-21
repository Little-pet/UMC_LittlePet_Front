import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 30px;
`;
export const HeaderWrapper = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media only screen and (min-width: 800px) {
  }
`;
export const Header = styled.ul`
  display: flex;
  align-items: center;
  @media only screen and (min-width: 800px) {
    margin-left: 90px;
  }
`;

export const HeaderFilter = styled.li<{ isActive: boolean }>`
  width: 80px;
  display: list-item;
  font-size: 18px;
  font-family: 'Pretendard-SemiBold';
  cursor: pointer;
  color: ${({ isActive }) => (isActive ? '#6EA8FE' : '#262627')};
  @media (min-width: 800px) {
    width: 85px;
  }
`;

export const ItemList = styled.div`
  display: flex;
  height: 452px;
  flex-direction: column;
  gap: 28px;
  overflow-y: auto; /* 세로 스크롤 */
  ::-webkit-scrollbar {
    display: none;
  }
    /* 크롬, 사파리, 오페라, 엣지에서 스크롤바 숨기기 */
  ::-webkit-scrollbar {
    display: none;
  }

  /* 인터넷 익스플로러에서 스크롤바 숨기기 */
  -ms-overflow-style: none; 

  /* 파이어폭스에서 스크롤바 숨기기 */
  scrollbar-width: none; 
}
`;
