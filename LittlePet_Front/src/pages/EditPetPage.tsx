import React, { useState, useEffect } from 'react';
import { usePets } from '#/context/PetContext';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import EditIconImg from '@assets/EditPicture.svg';
import DatePicker from '#/components/DatePicker';
import CategoryDropdown from '@components/CategoryDropdown';
import GenderTagButton from '#/components/Health/RecordHealthButton/GenderTagButton';
import axios from 'axios';
interface Pet {
  name: string;
  profilePhoto: string;
  categoryId: number;
  gender: string;
  birthDay: string;
}
// 서버에 post할 객체
interface ContextPet extends Pet {
  petId: number;
  categoryName: string;
}
const EditPetPage: React.FC = () => {
  const { petId } = useParams<{ petId: string }>();
  const { pets, deletePet, updatePet } = usePets();
  const navigate = useNavigate();
  const { categoryId, setCategoryId } = useState<number>();
  const tags = [
    {
      gender: 'FEMALE',
      title: '암컷',
      icon: '♀',
    },
    {
      gender: 'MALE',
      title: '수컷',
      icon: '♂',
    },
    {
      gender: 'ELSE',
      title: '기타',
      icon: null,
    },
  ];
  // 기존 반려동물 정보를 찾기
  const foundPet = pets.find((p) => p.petId === Number(petId));
  const [pet, setPet] = useState<Pet>({
    petId: foundPet?.petId || 0,
    name: foundPet?.name || '',
    profilePhoto: foundPet?.profilePhoto || '',
    categoryName: foundPet?.categoryName || '',
    gender: foundPet?.gender || 'else',
    birthDay: foundPet?.birthDay || '',
  });
  console.log(pet);
  console.log(petId);
  // 초기 상태 저장 (비교용)
  const [initialPet, setInitialPet] = useState<Pet>(pet);

  const [isModified, setIsModified] = useState(false);
  const [tagSelected, setTagSelected] = useState<string>('');
  useEffect(() => {
    // 초기 상태 설정
    if (foundPet) {
      setPet(foundPet);
      setInitialPet(foundPet);
    }
  }, [petId, pets]);

  // 변경 사항 감지
  useEffect(() => {
    const hasChanges =
      pet.name.trim() !== initialPet.name.trim() ||
      pet.profilePhoto !== initialPet.profilePhoto ||
      pet.categoryName !== initialPet.categoryName ||
      pet.gender !== initialPet.gender ||
      pet.birthDay !== initialPet.birthDay;

    setIsModified(hasChanges);
  }, [pet, initialPet]);

  const handleInputChange = (key: keyof Pet, value: string | File) => {
    setPet((prevPet) => ({
      ...prevPet,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    // 반려동물 정보 업데이트
    const newPet: Pet = {
      name: name, // 상태에서 가져온 이름
      birthDay: birthDate,
      gender: tagSelected,
      profilePhoto:
        profileImage instanceof File
          ? URL.createObjectURL(profileImage)
          : profileImage,
      categoryId: categoryId ?? 0,
    };
    try {
      const response = await axios.put(
        import.meta.env.VITE_BACKEND_URL + `/users/4/pets/${petId}`
      );
      console.log('성공', response.data);
      updatePet(pet);
      navigate('/mypage');
    } catch (error) {
      console.error('실패:', error);
    }
  };

  const handleDelete = async () => {
    try {
      console.log(petId);
      const response = await axios.delete(
        import.meta.env.VITE_BACKEND_URL + `/users/4/pets/${petId}`
      );
      console.log('성공', response.data);
      deletePet(Number(petId));
      navigate('/mypage');
    } catch (error) {
      console.error('실패:', error);
    }
  };

  return (
    <Container>
      <Title>반려동물 프로필 수정</Title>

      <ProfileWrapper
        onClick={() => document.getElementById('fileInput')?.click()}
      >
        <ProfileImgContainer>
          <HiddenInput
            type='file'
            accept='image/*'
            onChange={(e) =>
              handleInputChange('profilePhoto', e.target.files![0])
            }
            id='fileInput'
          />
          <ProfileImg src={pet.profilePhoto} />
        </ProfileImgContainer>
        <EditIcon src={EditIconImg} alt='편집' />
      </ProfileWrapper>

      <Form>
        <NameInputContainer>
          <Label>이름</Label>
          <Input
            type='text'
            value={pet.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
        </NameInputContainer>

        <BDInputContainer>
          <Label>생년월일</Label>
          <DatePicker
            selectedDate={pet.birthDay}
            onDateChange={(date) => handleInputChange('birthDay', date)}
          />
        </BDInputContainer>

        <SelectContainer>
          <CategoryDropdown
            selectedCategory={pet.categoryName}
            onCategorySelect={(category) =>
              handleInputChange('categoryName', category)
            }
          />
          <TagButtonContainer>
            {tags.map((tag, index) => (
              <GenderTagButton
                key={index}
                label={tag.title}
                icon={tag.icon}
                type={tag.gender}
                onClick={() => setTagSelected(tag.gender)}
                isSelected={tagSelected === tag.gender}
              />
            ))}
          </TagButtonContainer>
        </SelectContainer>
      </Form>

      <SaveButton onClick={handleSave} disabled={!isModified}>
        수정하기
      </SaveButton>
      <DeleteButton onClick={handleDelete}>삭제하기</DeleteButton>
    </Container>
  );
};

export default EditPetPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 20px;
  font-family: 'Pretendard';
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: bold;
`;

const ProfileWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const ProfileImgContainer = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
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

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 343px;
  margin-top:;
`;
const SaveButton = styled.button`
  width: 100%;
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
  margin-top: 89px;
`;

const DeleteButton = styled.button`
  width: 100%;
  height: 48px;
  padding: 14px;
  font-size: 16px;
  font-weight: 600;
  font-family: 'Pretendard';
  background-color: #c76b6b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
`;
