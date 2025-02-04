import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { usePetStore } from '#/context/petStore';
import { useUser } from '#/context/UserContext';
import Edit from '@assets/Edit.svg';
import animalIcon from '@assets/동물 아이콘.svg';

const ProfileSection: React.FC = () => {
  const { pets } = usePetStore();
  const { user } = useUser();
  const navigate = useNavigate();
  const handleEditProfile = () => {
    navigate('/edit-profile'); // 프로필 수정 페이지로 이동
  };

  return (
    <ProfileContainer>
      <ProfileImg src={user.profileImg} alt='ProfileImg' />
      <UserDetailsBox>
        <Nickname>{user.name}</Nickname>
        {/* 반려동물 등록 정보 */}
        <PetList>
          {pets.map((pet, index) => (
            <PetItem key={pet.petId}>
              <AnimalIcon src={animalIcon} alt={pet.petCategory} />
              {pet.petCategory}
              <GenderIcon gender={pet.gender}>
                {pet.gender === 'female' ? '♀' : '♂'}
              </GenderIcon>
              {index < pets.length - 1 && <Separator>·</Separator>}
            </PetItem>
          ))}
        </PetList>
      </UserDetailsBox>
      <EditButton onClick={handleEditProfile}>
        <img src={Edit} alt='EditButton' width={16} height={16} />
      </EditButton>
    </ProfileContainer>
  );
};

export default ProfileSection;

const ProfileContainer = styled.div`
  width: 343px;
  height: 50px;
  display: flex;
  gap: 15px;
  position: relative;
  overflow: hidden;
`;
const ProfileImg = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`;

const UserDetailsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: 49px;
  flex: 1;
`;

const Nickname = styled.p`
  font-weight: 600;
  margin: 0;
`;

const AnimalIcon = styled.img`
  height: 15px;
  width: 15px;
`;
const PetList = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;
  overflow-x: auto; /* 내용이 많을 경우 스크롤 */
  max-width: 100%;
`;

const PetItem = styled.div`
  display: flex;
  gap: 4px;
  height: 22px;
  font-weight: 600;
  font-size: 14px;
  align-items: center;
  white-space: nowrap;
`;

const GenderIcon = styled.span<{ gender: 'female' | 'male' }>`
  font-weight: 700;
  font-size: 14px;
  color: ${({ gender }) => (gender === 'female' ? '#C76B6B' : '#6EA8FE')};
`;

const Separator = styled.span`
  margin: 0 5px;
  font-weight: bold;
  color: #737373;
`;

const EditButton = styled.button`
  border-radius: 15px;
  border: 1px solid #e6e6e6;
  width: 46px;
  height: 28px;
  display: flex;
  justify-content: center;
  background-color: #fff;
  align-items: center;
`;
