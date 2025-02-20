import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import EditIconImg from '@assets/EditPicture.svg';
import DatePicker from '#/components/DatePicker';
import CategoryDropdown from '@components/CategoryDropdown';
import GenderTagButton from '#/components/Health/RecordHealthButton/GenderTagButton';
import axios from 'axios';
import DeleteModal from '#/components/DeleteModal';

interface Pet {
  name: string;
  profilePhoto: string;
  categorySpecies: string;
  gender: string;
  birthDay: string;
}

const EditPetPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { petId } = useParams<{ petId: string }>();
  //const { pets, deletePet, updatePet } = usePets();
  const navigate = useNavigate();
  const [tagSelected, setTagSelected] = useState<string>('');
  // 반려동물 정보 상태 관리
  const [profileImage, setProfileImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [categoryText, setCategoryText] = useState<string>('');

  const [birthDate, setBirthDate] = useState<string>('');

  // 파일 선택 핸들러
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('이미지 변경');
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileUrl = URL.createObjectURL(file);
      setPreviewImage(fileUrl);
      setProfileImage(file);
    }
  };

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
      gender: 'OTHER',
      title: '기타',
      icon: null,
    },
  ];

  const [info, setInfo] = useState<Pet | null>(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get(
          `https://umclittlepet.shop/api/pets/${petId}`
        );
        console.log('반려동물 단일 조회 성공:', response.data);
        setInfo(response.data.result); // 초기상태
      } catch (error) {
        console.error('반려동물 단일 조회 실패:', error);
      }
    };

    fetchPets(); // 선언한 async 함수 실행
  }, []);

  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    if (info) {
      setName(info.name || ''); // undefined 방지
      setBirthDate(info.birthDay || '');
      setCategoryText(info.categorySpecies || '');
      setPreviewImage(info.profilePhoto || '');
      setTagSelected(info.gender || '');
    }
  }, [info]);

  //  변경 감지하여 버튼 활성화
  useEffect(() => {
    const hasChanges =
      (info && name !== info.name) ||
      (info && birthDate !== info.birthDay) ||
      (info && categoryText !== info.categorySpecies) ||
      (info && previewImage !== info.profilePhoto) ||
      (info && tagSelected !== info.gender);

    setIsModified(hasChanges);
  }, [name, birthDate, categoryText, profileImage, tagSelected]);

  // 반려동물 정보 수정
  const handleSave = async () => {
    const petProfileRequest = {
      name,
      birthDay: birthDate.replace(/(\d{4})\.(\d{2})\.(\d{2}).*/, '$1-$2-$3'),
      gender: tagSelected,
      categorySpecies: categoryText,
    };
    console.log(petProfileRequest);
    const formData = new FormData();
    formData.append(
      'request',
      new Blob([JSON.stringify(petProfileRequest)], {
        type: 'application/json',
      })
    );
    if (profileImage instanceof File) {
      formData.append('file', profileImage);
    }
    try {
      const response = await axios.put(
        `https://umclittlepet.shop/api/pets/${petId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );
      console.log('반려동물 프로필 수정 성공', response.data);
      navigate('/mypage');
    } catch (error) {
      console.error('반려동물 프로필 수정 실패:', error);
    }
    console.log(categoryText);
  };

  const handleDelete = async () => {
    try {
      console.log('petId: ', petId);
      const response = await axios.delete(
        `https://umclittlepet.shop/api/pets/${petId}`
      );
      console.log('반려동물 프로필 삭제 성공', response.data);

      navigate('/mypage');
    } catch (error) {
      console.error('반려동물 프로필 삭제 실패:', error);
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
            onChange={handleImageUpload}
            id='fileInput'
          />
          <ProfileImg src={previewImage} />
        </ProfileImgContainer>
        <EditIcon src={EditIconImg} alt='편집' />
      </ProfileWrapper>

      <Form>
        <NameInputContainer>
          <Label>이름</Label>
          <Input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </NameInputContainer>

        <BDInputContainer>
          <Label>생년월일</Label>
          <DatePicker
            selectedDate={birthDate}
            onDateChange={(date) => setBirthDate(date)}
          />
        </BDInputContainer>

        <SelectContainer>
          <CategoryDropdown
            selectedCategory={categoryText}
            onCategorySelect={(category) => setCategoryText(category)}
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
      <DeleteButton onClick={() => setIsModalOpen(!isModalOpen)}>
        삭제하기
      </DeleteButton>
      {isModalOpen && (
        <Overlay>
          <DeleteModal
            onClose={() => setIsModalOpen(false)}
            onDelete={handleDelete}
          />
        </Overlay>
      )}
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
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000080;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;
