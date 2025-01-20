import React, { useState } from 'react';
import { useUser } from '#/context/UserContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import EditIconImg from '@assets/EditPicture.svg';

const EditProfilePage: React.FC = () => {
  const { user, setUser } = useUser();
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [bio, setBio] = useState('토끼와 햄스터를 키우고 있습니다! 잘 부탁드립니다~');
  const [profileImage, setProfileImage] = useState<string | File>(user.profileImg);

  const navigate = useNavigate();

  // 파일 선택 핸들러
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleSave = () => {
    const newUser = {
      name,
      phone,
      profileImage: profileImage instanceof File ? URL.createObjectURL(profileImage) : profileImage,
    };

    setUser(newUser);
    navigate('/mypage'); // 마이페이지로 이동
  };

  return (
    <Container>
      <Title>반려동물 프로필 등록</Title>
      
      <ProfileWrapper>
        <ProfileImgContainer onClick={() => document.getElementById('fileInput')?.click()}>
          <HiddenInput type="file" accept="image/*" onChange={handleImageUpload} id="fileInput" />
          <ProfileImg 
            src={profileImage instanceof File ? URL.createObjectURL(profileImage) : profileImage}
          
          />
        </ProfileImgContainer>
        <EditIcon src={EditIconImg} alt="편집" />
      </ProfileWrapper>

      <Form>
        
        <InputContainer>
          <Label>이름</Label>
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </InputContainer>

   
        <InputContainer>
          <Label>생년월일</Label>
          <Input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </InputContainer>
        
     
      </Form>

      <SaveButton onClick={handleSave}>등록하기</SaveButton>
    </Container>
  );
};

export default EditProfilePage;


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
  display:flex;
  flex-direction:column;
  gap:40px;

`;

const Label = styled.label`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  display: block;
  color:#737373;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction:column;
  gap: 9px;
  height:60px;
  width:343px;
  border-bottom: 1px solid #e6e6e6;
  
`;

const Input = styled.input`
  display:flex;
  border: none;
  font-size: 14px;
  font-family:'Pretendard';
  height:29px;
  width:100%;
  justify-content:space-between;
  flex:1;
  box-sizing: border-box;
  padding:0;
  
`;

const SaveButton = styled.button`
  width: 100%;
  max-width: 343px;
  height:48px;
  padding: 14px;
  font-size: 16px;
  font-weight: 600;
  font-family:'Pretendard';
  background-color:#6EA8FE;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  position: absolute; /* 화면의 하단 기준 위치 */
  bottom: 60px; /* 화면 하단에서 60px 위로 이동 *
`;
