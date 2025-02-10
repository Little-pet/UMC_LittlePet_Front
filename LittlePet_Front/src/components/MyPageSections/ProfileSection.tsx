import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Edit from '@assets/Edit.svg';
import defaultPhoto from '#/assets/기본 프로필.svg';
import hamsterIcon from '#/assets/hamster.svg';
import rabbitIcon from '#/assets/rabbit.svg';
import hedgehogIcon from '#/assets/hedgehog.svg';

const ProfileSection: React.FC = ({ user, pets, isLoading }) => {
  if (!user) return <div>Loading...</div>;
  const getAnimalIcon = (category: string) => {
    switch (category) {
      case '햄스터':
        return hamsterIcon;
      case '토끼':
        return rabbitIcon;
      case '고슴도치':
        return hedgehogIcon;
    }
  };
  // pets 배열에서 중복되지 않는 petCategory 값을 추출
  const distinctCategories = Array.from(
    new Set(pets.map((pet: Pet) => pet.petCategory))
  ) as string[];

  const navigate = useNavigate();
  const handleEditProfile = () => {
    navigate('/edit-profile'); // 프로필 수정 페이지로 이동
  };
  //console.log('펫', pets);
  //console.log(user);
  return (
    <ProfileContainer>
      <ProfileImg
        src={user.profilePhoto === 'default' ? defaultPhoto : user.profilePhoto}
        alt='ProfileImg'
      />
      <UserDetailsBox>
        <Nickname>{user.name}</Nickname>
        {/* 반려동물 등록 정보 */}
        <PetList>
          {distinctCategories.map((category: string) => (
            <PetItem key={category}>
              <AnimalIcon src={getAnimalIcon(category)} alt={category} />
              {category}
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
  width: 100%;
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
  height: 20px;
  width: 20px;
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
