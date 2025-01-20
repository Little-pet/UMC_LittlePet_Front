import React from 'react';
import styled from 'styled-components';
import {useUser} from '#/context/UserContext';
import { useNavigate } from 'react-router-dom';
import Edit from '@assets/Edit.svg';
import StatsComponent from '@components/MyPageSections/CategoryBar';
import BadgeComponent from '@components/MyPageSections/BadgeLists';
import Menu from '@components/MyPageSections/Menu';
import PetProfiles from '@components/MyPageSections/PetProfiles';

const MyPage: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate('/edit-profile'); // 프로필 수정 페이지로 이동
  };
  const userActivity = {
    likes: 120, // 좋아요 120개 → 인기 챌린저 획득
    posts: 10,  // 게시글 10개 → 획득 불가
    comments: 35, // 댓글 35개 → 소통 천재 획득
  };

  return (
    <Container>
      <Title>마이페이지</Title>
      <ProfileContainer>
        <ProfileBox>
          <ProfileImg src={user.profileImg} alt='ProfileImg' />
          <UserDetailsBox>
            <Nickname>{user.name}</Nickname>
            {/* 반려동물 등록 정보 */}
            <PetsInfo>토끼</PetsInfo>
          </UserDetailsBox>
          <EditButton  onClick={handleEditProfile}>
            <img src={Edit} alt='EditButton' width={16} height={16} />
          </EditButton>
        </ProfileBox>
        <StatsComponent user={userActivity} />
        <PetProfiles/>
        <BadgeComponent user={userActivity}/>
      </ProfileContainer>
      <Menu></Menu>

    </Container>
  );
};

export default MyPage;

const Container = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:32px;
`;

const Title = styled.p`
  text-align: center;
  font-family: 'Pretendard';
  font-weight: 600;
  font-size: 22px;
  
`;

const ProfileContainer = styled.div`
  display:flex;
  flex-direction:column;
  gap:23px;`

const ProfileBox = styled.div`
  width:343px;
  height:50px;
  display:flex;
  gap:15px;
  position: relative;
 
  `

const ProfileImg = styled.img`
  height:50px;
  width:50px;`

const UserDetailsBox = styled.div`
  display:flex;
  flex-direction:column;
  gap:5px;
  height:49px;
  `

const Nickname = styled.p`
  font-weight:600;
  margin:0;
  ;
  `
const PetsInfo = styled.div`
  display:flex;
  gap:8px;
  height:22px;
  font-weight:600;
  font-size:14px;
  align-items:center`

const EditButton = styled.button`
  border-radius:15px;
  border:1px solid #e6e6e6;
  width:46px;
  height:28px;
  left:290px;
  background-color:#fff;
  align-items:center;
  position: absolute;
  top: 5px;  
  right: 5px; 
  `

