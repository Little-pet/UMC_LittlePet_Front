import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import EditIconImg from '@assets/EditPicture.svg';
import DatePicker from '#/components/DatePicker';
import CategoryDropdown from '@components/CategoryDropdown';
import GenderTagButton from '#/components/Health/RecordHealthButton/GenderTagButton';
import axios from 'axios';
import { useAuthStore } from '#/context/AuthStore';
import { format } from 'date-fns';

const PetRegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const [tagSelected, setTagSelected] = useState<string>('');
  // 반려동물 정보 상태 관리
  const [profileImage, setProfileImage] = useState<string | File>('');
  const [name, setName] = useState<string>('');
  const [categoryText, setCategoryText] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');
  const userId = useAuthStore((state) => state.userId);

  // 파일 선택 핸들러
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
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

  // 서버에 post할 객체
  interface Pet {
    name: string; // 반려동물 이름
    birthDay: string; // 생년월일 (날짜 타입도 가능)
    gender: string; // 성별 (선택된 태그)
    profilePhoto: string; // 이미지 URL
    categoryName: string; // 카테고리 ID
  }
  void {} as Pet;

  const handleSave = async () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const formattedBirthDate = birthDate
      ? birthDate.replace(/(\d{4})\.(\d{2})\.(\d{2}).*/, '$1-$2-$3') // "yyyy.MM.dd" -> "yyyy-MM-dd"
      : today;
    if (!formattedBirthDate.trim()) {
      console.error('생년월일을 입력하세요.');
      return;
    }
    console.log(`서버에 보낼 생년월일: ${formattedBirthDate}`);
    const petProfileRequest = {
      name,
      birthDay: formattedBirthDate,
      gender: tagSelected,
      categorySpecies: categoryText,
    };
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
    console.log('생년월일', formattedBirthDate);
    console.log(petProfileRequest);
    console.log(profileImage);
    try {
      const response = await axios.post(
        `https://umclittlepet.shop/api/users/${userId}/pets`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );
      console.log('반려동물 프로필 등록 성공', response.data);

      navigate('/mypage');
    } catch (error) {
      console.error('반려동물 프로필 등록 실패:', error);
    }
  };

  return (
    <Container>
      <Title>반려동물 프로필 등록</Title>
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
  &::placeholder {
    font-size: 14px;
    font-family: Pretendard-Medium;
  }
  &:focus {
    outline: none; /* 포커스 상태에서 기본 outline 제거 */
    border: none; /* 포커스 상태에서 추가 border 제거 */
  }
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
