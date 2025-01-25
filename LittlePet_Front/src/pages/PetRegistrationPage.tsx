import React, { useState } from 'react';
import { usePets } from '#/context/PetContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import EditIconImg from '@assets/EditPicture.svg';
import DatePicker from '#/components/DatePicker';
import CategoryDropdown from '@components/CategoryDropdown';
import TagButton from '@components/Community/AddPage/tagButton';

const PetRegistrationPage: React.FC = () => {
  const { pets, addPet } = usePets();
  const navigate = useNavigate();
  const [tagSelected, setTagSelected] = useState<string>('');
  // 반려동물 정보 상태 관리
  const [profileImage, setProfileImage] = useState<string | File>('');
  const [name, setName] = useState<string>('');
  const [categoryText, setCategoryText] = useState<string>('');

  // 파일 선택 핸들러
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const tags = [
    {
      gender: 'female',
      title: '암컷',
      icon: '♀',
    },
    {
      gender: 'male',
      title: '수컷',
      icon: '♂',
    },
    {
      gender: 'else',
      title: '기타',
      icon: null,
    },
  ];
  // 태그 클릭
  const handleTagClick = (type: string) => {
    setTagSelected(type);
  };

  const handleSave = () => {
    const newPet = {
      id: pets.length + 1, // id 자동 생성
      name: name, // 상태에서 가져온 이름
      profileImage:
        profileImage instanceof File
          ? URL.createObjectURL(profileImage)
          : profileImage,
      category: categoryText,
      gender: tagSelected,
    };
    addPet(newPet); // 컨텍스트에 새로운 반려동물 추가
    navigate('/mypage');
  };

  return (
    <Container>
      <Title>반려동물 프로필 등록</Title>

      <ProfileWrapper>
        <ProfileImgContainer
          onClick={() => document.getElementById('fileInput')?.click()}
        >
          <HiddenInput
            type='file'
            accept='image/*'
            onChange={handleImageUpload}
            id='fileInput'
          />
          <ProfileImg
            src={
              profileImage instanceof File
                ? URL.createObjectURL(profileImage)
                : profileImage
            }
          />
        </ProfileImgContainer>
        <EditIcon src={EditIconImg} alt='편집' />
      </ProfileWrapper>

      <Form>
        <NameInputContainer>
          <Label>이름</Label>
          <Input type='text' onChange={(e) => setName(e.target.value)} />
        </NameInputContainer>

        <BDInputContainer>
          <Label>생년월일</Label>
          <DatePicker />
        </BDInputContainer>

        <SelectContainer>
          <CategoryDropdown
            selectedCategory={categoryText}
            onCategorySelect={(category) => setCategoryText(category)}
          />
          <TagButtonContainer>
            {tags.map((tag, index) => (
              <TagButton
                key={index}
                label={tag.title}
                icon={tag.icon}
                type={tag.gender}
                onClick={() => handleTagClick(tag.gender)}
                isSelected={tagSelected === tag.gender}
              />
            ))}
          </TagButtonContainer>
        </SelectContainer>
      </Form>

      <SaveButton
        disabled={!name.trim() || !categoryText.trim() || !tagSelected}
        type='submit'
        onClick={handleSave}
      >
        등록하기
      </SaveButton>
    </Container>
  );
};

export default PetRegistrationPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 20px;
  font-family: 'Pretendard';
  margin-top: -45px;
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: bold;
`;

const ProfileWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

const ProfileImgContainer = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid #ccc;
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const EditIcon = styled.img`
  position: absolute;
  width: 30px;
  height: 30px;
  bottom: 0;
  right: 0;
  border-radius: 50%;
  padding: 5px;
`;

const HiddenInput = styled.input`
  display: none;
`;

const Form = styled.div`
  width: 100%;
  max-width: 343px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  display: block;
  color: #737373;
`;

const NameInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
  height: 60px;
  width: 343px;
  border-bottom: 1px solid #e6e6e6;
`;

const BDInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
  height: 79px;
  width: 343px;
  border-bottom: 1px solid #e6e6e6;
`;

const Input = styled.input`
  display: flex;
  border: none;
  font-size: 14px;
  font-family: 'Pretendard';
  height: 29px;
  width: 100%;
  justify-content: space-between;
  flex: 1;
  box-sizing: border-box;
  padding: 0;
`;

const SelectContainer = styled.div`
  display: flex;
  width: 343px;
  height: 35px;
  justify-content: space-between;
`;

const TagButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  width: 178px;
  height: 35px;
`;

const SaveButton = styled.button`
  width: 100%;
  max-width: 343px;
  height: 48px;
  padding: 14px;
  font-size: 16px;
  font-weight: 600;
  font-family: 'Pretendard';
  background-color: ${({ disabled }) => (disabled ? '#E6E6E6' : '#6EA8FE')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  color: white;
  border: none;
  border-radius: 5px;
  text-align: center;
  const SaveButton = styled.button;
  margin-top: 149px;
`;
