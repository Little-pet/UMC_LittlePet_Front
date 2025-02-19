import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import EditIconImg from '@assets/EditPicture.svg';
import defaultPhoto from '#/assets/기본 프로필.svg';
import Toast from '#/components/Toast';
import { useAuthStore } from '#/context/AuthStore';
interface User {
  nickname: string;
  profilePhoto: string;
  phone: string;
  introduction: string;
  userId: string;
}
const EditProfilePage: React.FC = () => {
  const navigate = useNavigate();

  // 사용자 상태 관리
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [profileImage, setProfileImage] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string>('');
  const [isModified, setIsModified] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [isToastVisible, setToastVisible] = useState<boolean>(false);
  const [info, setInfo] = useState<User | null>(null);
  const userId = useAuthStore((state) => state.userId);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://umclittlepet.shop/api/users/update/${userId}`
        );
        console.log('프로필 조회 성공:', response.data);
        setInfo(response.data.result); // 초기상태
      } catch (error) {
        console.error('프로필 조회 실패:', error);
      }
    };

    fetchUser(); // 선언한 async 함수 실행
  }, []);

  useEffect(() => {
    if (info) {
      setName(info.nickname || '');
      setPhone(info.phone || '');
      setBio(info.introduction || '');
      setPreviewImage(info.profilePhoto || '');
    }
  }, [info]);
  // 변경 사항 감지
  useEffect(() => {
    if (!info) return; // info가 null이면 실행하지 않음

    setIsModified(
      name !== info.nickname ||
        phone !== info.phone ||
        bio !== info.introduction ||
        previewImage !== info.profilePhoto // profileImage 대신 previewImage 사용
    );
  }, [name, phone, bio, previewImage, info]);

  // 입력값 핸들링 함수
  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setter(e.target.value);

  // 이미지 업로드 핸들러
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileUrl = URL.createObjectURL(file);
      setPreviewImage(fileUrl);
      setProfileImage(file);
    }
  };

  // 전화번호 입력 핸들러 (자동 '-' 추가)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, ''); // 숫자가 아닌 문자 제거

    // 010-1234-5678 형식 적용
    if (numericValue.length <= 3) {
      setPhone(numericValue);
    } else if (numericValue.length <= 7) {
      setPhone(`${numericValue.slice(0, 3)}-${numericValue.slice(3)}`);
    } else {
      setPhone(
        `${numericValue.slice(0, 3)}-${numericValue.slice(3, 7)}-${numericValue.slice(7, 11)}`
      );
    }
  };
  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
  };

  const closeToast = () => {
    setToastVisible(false);
  };

  // 저장 버튼 클릭 시 사용자 정보 업데이트
  const handleSave = async () => {
    const isValidName = /^(?=.*\S).{1,10}$/.test(name);
    if (!isValidName) {
      showToast('닉네임은 공백포함 1~10자입니다!');
      return;
    }

    const updatedUser = { nickname: name, phone, introduction: bio };
    const formData = new FormData();
    formData.append(
      'request',
      new Blob([JSON.stringify(updatedUser)], { type: 'application/json' })
    );
    if (profileImage instanceof File) {
      formData.append('file', profileImage);
      //console.log('사진 보내짐!!');
    }
    /*  for (const x of formData) {
      console.log(x);
    } */
    try {
      const response = await axios.post(
        `https://umclittlepet.shop/api/users/${info.userId}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );
      console.log('반려동물 프로필 수정 성공', response.data);
      navigate('/mypage');
    } catch (error) {
      console.error('반려동물 프로필 수정 실패:', error);
    }
  };

  return (
    <Container>
      <Title>프로필 수정</Title>

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
            src={previewImage === null ? defaultPhoto : previewImage}
          />
        </ProfileImgContainer>
        <EditIcon src={EditIconImg} alt='편집' />
      </ProfileWrapper>

      <Form>
        <NameInputContainer>
          <Label>닉네임</Label>
          <NickNameBox>
            <NameInput
              type='text'
              value={name}
              onChange={handleInputChange(setName)}
            />
            <CheckButton>중복확인</CheckButton>
          </NickNameBox>
        </NameInputContainer>

        <InputContainer>
          <Label>전화번호</Label>
          <Input type='text' value={phone} onChange={handlePhoneChange} />
        </InputContainer>

        <BioContainer>
          <InputContainer>
            <Label>자기소개</Label>
            <Input
              type='text'
              value={bio}
              onChange={handleInputChange(setBio)}
            />
          </InputContainer>
          <CharacterCount>
            {(bio || '').length}/<MaxCount>50</MaxCount>
          </CharacterCount>
        </BioContainer>
      </Form>

      <SaveButton onClick={handleSave} disabled={!isModified}>
        수정하기
      </SaveButton>
      {toastMessage && (
        <Toast
          message={toastMessage}
          isVisible={isToastVisible}
          onClose={closeToast}
        />
      )}
    </Container>
  );
};

export default EditProfilePage;

// 스타일링

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
  margin-bottom: 20px;
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
  gap: 40px;
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
  height: 65px;
  width: 343px;
  border-bottom: 1px solid #e6e6e6;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
  height: 60px;
  width: 343px;
  border-bottom: 1px solid #e6e6e6;
`;

const NameInput = styled.input`
  display: flex;
  border: none;
  font-size: 14px;
  font-family: 'Pretendard';
  height: 34px;
  width: 100%;
  box-sizing: border-box;
  padding: 0;
`;

const Input = styled.input`
  display: flex;
  border: none;
  font-size: 14px;
  font-family: 'Pretendard';
  height: 29px;
  width: 100%;
  box-sizing: border-box;
  padding: 0;
`;

const NickNameBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const CheckButton = styled.button`
  padding: 5px 9px;
  background-color: #ffffff;
  color: #6ea8fe;
  font-size: 12px;
  border: 1px solid #6ea8fe;
  border-radius: 5px;
  cursor: pointer;
  height: 27px;
  width: 75px;
  font-family: 'Pretendard';
`;

const CharacterCount = styled.div`
  text-align: right;
  font-size: 12px;
  color: #262627;
  height: 22px;
  margin-top: 10px;
`;

const MaxCount = styled.p`
  color: #737373;
  display: inline;
`;

const BioContainer = styled.div``;

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
  margin-top: 89px;
`;
