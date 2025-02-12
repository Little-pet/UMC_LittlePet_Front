import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePets } from '#/context/PetContext';
import styled from 'styled-components';
import AddButtonIcon from '@assets/AddButton.svg';
const PetProfiles: React.FC = () => {
  const { pets } = usePets();
  const navigate = useNavigate();

  const handlePetClick = (petId: number) => {
    navigate(`/edit-pet/${petId}`);
  };

  return (
    <Container>
      {pets.map((pet) => (
        <ProfileCard key={pet.id} onClick={() => handlePetClick(pet.id)}>
          <ProfileImage src={pet.profileImage} alt={pet.name} />
          <ProfileName>{pet.name}</ProfileName>
        </ProfileCard>
      ))}
      <PetItem>
        <AddButton
          src={AddButtonIcon}
          onClick={() => navigate('/pet-register')}
        />
        <ProfileName>등록하기</ProfileName>
      </PetItem>
    </Container>
  );
};

export default PetProfiles;

const Container = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  overflow-x: auto; /* 가로 스크롤 가능하도록 설정 */
  max-width: 100%; /* 부모 요소에 맞추기 */
  white-space: nowrap;

  /* 스크롤바 숨기기 */
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  white-space: nowrap;
`;

const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
`;

const ProfileName = styled.div`
  margin-top: 5px;
  font-size: 14px;
`;

const PetItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  width: 60px;
  height: 83px;
`;

const AddButton = styled.img``;
