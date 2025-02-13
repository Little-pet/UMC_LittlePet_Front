import styled from 'styled-components';
import React, { useEffect } from 'react';
// Props 타입 정의
interface DeleteModalProps {
  onClose: () => void; // onClose는 함수이며 반환값은 없습니다.
}
const DeleteModal: React.FC<DeleteModalProps> = ({ onClose, onDelete }) => {
  return (
    <Container>
      <Message>정말 삭제하시겠습니까?</Message>
      <ButtonGroup>
        <Button onClick={onDelete} color='#C76B6B' textColor='white'>
          삭제
        </Button>
        <Button onClick={onClose}>취소</Button>
      </ButtonGroup>
    </Container>
  );
};
export default DeleteModal;
const Container = styled.div`
  width: 343px;
  height: 155px;
  background-color: white;
  border-radius: 15px;
  padding: 30px 25px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const Message = styled.div`
  font-size: 20px;
  font-family: 'Pretendard-SemiBold';
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
`;

const Button = styled.div`
  background-color: ${({ color }) => color || '#E6E6E6'};
  color: ${({ textColor }) => textColor || '#737373'};
  font-size: 16px;
  font-family: 'Pretendard-SemiBold';
  border-radius: 5px;
  width: 75px;
  padding: 11px 0;
  text-align: center;
  box-sizing: border-box;
  cursor: pointer;
`;
