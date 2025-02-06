import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePets } from '#/context/PetContext';
import styled from 'styled-components';
import AddButtonIcon from '@assets/AddButton.svg';
import axios from 'axios';
interface PetProfile {
  petId: number;
  name: string;
  profilePhoto: string;
}
const PetProfiles: React.FC = () => {
  const { pets } = usePets();
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<PetProfile[]>([]);
  useEffect(() => {
    const fetchPets = async () => {
      const endpoint = '/users/4/pets/All';
      try {
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + endpoint
        );
        console.log('사용자별 반려동물 목록 조회 성공:', response.data);
        setProfiles(response.data.result);
      } catch (error) {
        console.error('사용자별 반려동물 목록 조회 실패:', error);
      }
    };

    fetchPets(); // ✅ 선언한 async 함수 실행
  }, []);
  const handlePetClick = (petId: number) => {
    navigate(`/edit-pet/${petId}`);
  };

  return (
    <Container>
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.petId}
          onClick={() => handlePetClick(profile.petId)}
        >
          <ProfileImage src={profile.profilePhoto} alt={profile.name} />
          <ProfileName>{profile.name}</ProfileName>
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
