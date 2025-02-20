import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Edit from '@assets/Edit.svg';
import defaultPhoto from '#/assets/기본 프로필.svg';
import { AnimalIcons } from '#/components/icon';
import { useUserStore } from '#/store/UserStore';

const ProfileSection: React.FC = () => {
  const { user, pets = [], isLoading } = useUserStore();
  useEffect(() => {
    console.log(' Zustand 상태 확인:', useUserStore.getState());
  }, [useUserStore().pets]);

  const getAnimalIcon = (category: string) => {
    switch (category) {
      case '햄스터':
        return AnimalIcons.hamster;
      case '토끼':
        return AnimalIcons.rabbit;
      case '고슴도치':
        return AnimalIcons.hedgehog;
      case '페럿':
        return AnimalIcons.ferret;
      case '앵무새':
        return AnimalIcons.parrot;
      case '거북이':
        return AnimalIcons.turtle;
      case '뱀':
        return AnimalIcons.snake;
    }
  };
  // pets 배열에서 중복되지 않는 petCategory 값을 추출
  const distinctCategories = Array.from(
    new Set((pets ?? []).map((pet) => pet.petCategory))
  ) as string[];

  const navigate = useNavigate();
  const handleEditProfile = () => {
    navigate('/edit-profile'); // 프로필 수정 페이지로 이동
  };
  //console.log('펫', pets);
  //console.log(user);
  if (isLoading || !user) {
    return <Skeleton />;
  }
  return (
    <ProfileContainer>
      <ProfileImg
        src={user.profilePhoto === null ? defaultPhoto : user.profilePhoto}
        alt='ProfileImg'
      />
      <ProfileBox>
        <UserDetailsBox>
          <Nickname>{user.name}</Nickname>
          <EditButton onClick={handleEditProfile}>
            <img src={Edit} alt='EditButton' width={16} height={16} />
          </EditButton>
        </UserDetailsBox>

        {/* 반려동물 등록 정보 */}
        <PetList>
          {distinctCategories.map((category: string, index) => (
            <PetItem key={category}>
              <AnimalIcon src={getAnimalIcon(category)} alt={category} />
              {category}
              {index < distinctCategories.length - 1 &&
                distinctCategories.length > 0 && <Separator>·</Separator>}
            </PetItem>
          ))}
        </PetList>
      </ProfileBox>
    </ProfileContainer>
  );
};

export default ProfileSection;

const ProfileContainer = styled.div`
  width: 100%;
  //height: 50px;
  display: flex;
  gap: 15px;
  position: relative;
  //overflow: hidden;
  @media only screen and (min-width: 800px) {
    margin-top: 50px;
  }
`;
const ProfileImg = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  object-fit: cover;
`;
const ProfileBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const UserDetailsBox = styled.div`
  display: flex;
align-items: center;
  width: 100%
  height: 27px;
  justify-content: space-between;
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
  flex-wrap: wrap;
  gap: 8px;
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
  cursor: pointer;
`;
const Skeleton = styled.div`
  height: 55px;
  width: 100%;
  border-radius: 10px;
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
