import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import addIcon from '#/assets/add.png';

const AddButtonWrapper = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: #6ea8fe;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
`;
// 커뮤니티 글 등록 버튼
const AddButton = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/community/add');
  };

  return (
    <AddButtonWrapper onClick={handleNavigate}>
      <img src={addIcon} />
    </AddButtonWrapper>
  );
};

export default AddButton;
