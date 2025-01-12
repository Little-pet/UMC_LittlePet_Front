import styled from 'styled-components';
const Container = styled.div`
  width: 100%;
  height: 44px;
  border-top: 3px solid #e9e9e9;
  border-bottom: 3px solid #e9e9e9;
  box-sizing: border-box;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  bottom: 1px;
`;

const Text = styled.p`
  font-size: 14px;
  font-family: 'Pretendard-SemiBold';
  margin: 0;
`;
// 카테고리 전체보기를 누르면 나오는 페이지 상단의 Divider
const TotalTextBar = () => {
  return (
    <Container>
      <Text>전체 글</Text>
    </Container>
  );
};
export default TotalTextBar;
