import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled /*{ keyframes }*/ from 'styled-components';
import AddButtonIcon from '@assets/AddButton.svg';

interface Pet {
  petId: number;
  name: string;
  profilePhoto: string;
}

interface PetProfilesProps {
  pets: Pet[];
  isLoading: boolean;
}

const PetProfiles: React.FC<PetProfilesProps> = ({ pets, isLoading }) => {
  //const { pets, fetchPets } = usePetStore();

  const navigate = useNavigate();

  const handlePetClick = (petId: number) => {
    navigate(`/edit-pet/${petId}`);
  };
  if (isLoading || !pets)
    return (
      <Box>
        {new Array(3).fill('').map((_, i) => (
          <Item key={i} />
        ))}
      </Box>
    );
  /* const { isLoading } = useQuery({
    queryKey: ['pets', userId],
    queryFn: () => fetchPets(userId),
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
  }); */
  /*  if (true) {
    return (
      <Container>
        {Array.from({ length: 3 }).map((_, idx) => (
          <ProfileCard key={idx}>
            <SkeletonCard />
            <ProfileName>dd</ProfileName>
          </ProfileCard>
        ))}
      </Container>
    );
  } */
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

const LoadingMessage = styled.p`
  font-size: 18px;
  margin-top: 50px;
`;
const Box = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
`;
const Item = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  @keyframes skeleton-gradient {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }
  animation: skeleton-gradient 1.5s infinite ease-in-out;
`;
