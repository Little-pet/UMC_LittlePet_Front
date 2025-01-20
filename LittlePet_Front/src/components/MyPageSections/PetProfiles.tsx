import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePets } from '@context/PetContext';
import styled from 'styled-components';
import AddButtonIcon from '@assets/AddButton.svg';
const PetProfiles: React.FC = () => {
  const { pets } = usePets();
  const navigate = useNavigate();

  return (
    <Container>
      {pets.map((pet) => (
        <ProfileCard key={pet.id}>
          <ProfileImage src={pet.profileImage} alt={pet.name} />
          <ProfileName>{pet.name}</ProfileName>
        </ProfileCard>
      ))}
      <PetItem>
        <AddButton src={AddButtonIcon} onClick={() => navigate('/pet-register')} />
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
`;

const ProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const AddButton = styled.img`
`


