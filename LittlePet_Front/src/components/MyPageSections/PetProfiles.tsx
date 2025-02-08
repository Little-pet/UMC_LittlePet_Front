import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePetStore } from '#/context/petStore';
import styled from 'styled-components';
import AddButtonIcon from '@assets/AddButton.svg';
interface PetProfile {
  petId: number;
  name: string;
  profilePhoto: string;
}
const PetProfiles: React.FC = () => {
  const { pets, fetchPets } = usePetStore();
  const navigate = useNavigate();
  useEffect(() => {
    fetchPets(4);
  }, [fetchPets]);
  const handlePetClick = (petId: number) => {
    navigate(`/edit-pet/${petId}`);
  };

  return (
    <Container>
      {pets.map((pet) => (
        <ProfileCard key={pet.petId} onClick={() => handlePetClick(pet.petId)}>
          <ProfileImage src={pet.profilePhoto} alt={pet.name} />
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
  width: 100%; /* 부모 요소에 맞추기 */
  white-space: nowrap;
`;

const ProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  white-space: nowrap;
  cursor: pointer;
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
