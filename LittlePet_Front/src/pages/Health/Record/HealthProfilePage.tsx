import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePetStore } from '#/context/petStore';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import logo from '@assets/logo.svg';
import animalIcon from '@assets/동물 아이콘.svg';
import dayjs from 'dayjs';
import healthy from '@assets/건강.svg';
import good from '@assets/양호.svg';
import bad from '@assets/악화.svg';
import rabbit from '@assets/animaldropdown/rabbit.svg';
import hamster from '@assets/animaldropdown/hamster.svg';
import hedgehog from '@assets/animaldropdown/hedgehog.svg';

import { getFormattedDate } from '@utils/dateUtils';

/* API 요청 함수 (선택한 반려동물의 최신 건강 기록 조회) */
const fetchHealthRecord = async (petId: number) => {
  const response = await axios.get(
    `https://umclittlepet.shop/api/pets/${petId}/health-records/latest`,
    { withCredentials: true }
  );
  return response.data.result;
};

const HealthProfile: React.FC = () => {
  const navigate = useNavigate();

  const { pets, fetchPets, selectedPet, selectPet } = usePetStore();
  const [loading, setLoading] = useState(true);
  const [selectedPetDetails, setSelectedPetDetails] = useState<{
    gender?: string;
    birthDay?: string;
    petCategory?: string;
  } | null>(null);

  const userId = 4;
  //const recordDate = dayjs().format('YYYY-MM-DD');

  //처음 실행될 때 fetchPets
  useEffect(() => {
    const fetchData = async () => {
      await fetchPets(userId);
    };

    fetchData();
  }, []);

  //pets배열이 바뀔 때마다다
  useEffect(() => {
    if (pets.length > 0) {
      setLoading(false);
    }
  }, [pets]);

  /* Tanstack Query 사용하여 최신 건강 기록 캐싱 */
  const { data: healthRecord, isLoading: recordLoading } = useQuery({
    queryKey: ['healthRecord', selectedPet?.petId],
    queryFn: () => fetchHealthRecord(selectedPet!.petId),

    enabled: !!selectedPet, // selectedPet이 있을 때만 실행
    staleTime: 0,
  });

  useEffect(() => {
    if (healthRecord) {
      console.log(' healthRecord 업데이트 감지!', healthRecord);
      setSelectedPetDetails({
        gender: healthRecord.gender || '정보 없음',
        birthDay:
          healthRecord.birthDay && healthRecord.birthDay !== 'Invalid Date'
            ? dayjs(healthRecord.birthDay).format('YYYY.MM.DD')
            : '정보 없음',
        petCategory: healthRecord.petCategory || '정보 없음',
      });
    } else {
      console.log('healthRecord가 업데이트되지 않음');
    }
  }, [healthRecord, selectedPet]);

  /** 건강 상태에 따른 뱃지 이미지 */
  const healthBadgeMap: { [key: string]: string } = {
    건강: healthy,
    양호: good,
    악화: bad,
  };
  const healthStatus = healthRecord?.healthStatus || '정보 없음';
  const healthBadgeImage = healthBadgeMap[healthStatus] || healthy;

  //동물 종 /** 건강 상태에 따른 뱃지 이미지 */
  const animalIconMap: { [key: string]: string } = {
    토끼: rabbit,
    햄스터: hamster,
    고슴도치: hedgehog,
  };
  const animalCategory = selectedPetDetails?.petCategory || '정보 없음';
  const animalIcon = animalIconMap[animalCategory] || null;

  const roundedWeightDiff =
    Math.round(healthRecord?.weightDifference * 10) / 10;
  const weightChangeText =
    roundedWeightDiff !== undefined
      ? roundedWeightDiff === 0
        ? '유지'
        : roundedWeightDiff > 0
          ? `${roundedWeightDiff}kg 증가`
          : `${Math.abs(roundedWeightDiff)}kg 감소`
      : '데이터 없음';

  const handlePetDetailClick = (pet: any) => {
    navigate(`/health/record/detail/${pet.petId}`);
  };

  if (loading) return <Loading>반려동물 정보를 불러오는 중...</Loading>;

  return (
    <>
      <PageTitle>건강 기록 프로필</PageTitle>
      <Container>
        {pets.length > 0 ? (
          <>
            <PetList>
              {pets.map((pet) => (
                <PetItem
                  key={pet.petId}
                  onClick={() => selectPet(pet)}
                  isSelected={selectedPet?.petId === pet.petId}
                >
                  <PetImg src={pet.profilePhoto} alt={pet.name} />
                  {pet.name}
                </PetItem>
              ))}
            </PetList>

            <PetDetails onClick={() => handlePetDetailClick(selectedPet!)}>
              <PetCard>
                <PetImgLarge
                  src={selectedPet?.profilePhoto || logo}
                  alt={selectedPet?.name || '등록된 반려동물 없음'}
                />
                <PetInfo>
                  <PetName>
                    {selectedPet?.name || '등록된 반려동물 없음'}
                  </PetName>
                  <PetDetail>
                    <AnimalIcon src={animalIcon} />
                    {selectedPetDetails?.petCategory || '정보 없음'}

                    <GenderIcon gender={selectedPetDetails?.gender}>
                      {selectedPetDetails?.gender === 'female' ? '♀' : '♂'}
                    </GenderIcon>

                    <PetBirthDate>
                      생년월일:{' '}
                      {selectedPetDetails?.birthDay
                        ? selectedPetDetails.birthDay
                        : '정보 없음'}
                    </PetBirthDate>
                  </PetDetail>

                  {/* 응답 데이터 확인 후 recordDate그대로가 아니라 0일전으로 변경해야될 수도 있음 */}
                  <RecentUpdate>
                    최근 업데이트:{' '}
                    {` ${getFormattedDate(healthRecord?.latestRecord.recordDate ?? null)}`}
                  </RecentUpdate>
                </PetInfo>
                <HealthBadge src={healthBadgeImage} alt={healthStatus} />
              </PetCard>
              <HealthRecord>
                {/* 추후에 기록한 데이터 연동해서 보이게할 예정 */}
                <RecordItem>
                  <Label>체중</Label>
                  <Value>
                    {healthRecord?.latestRecord.weight}kg
                    <WeightChange>
                      {/* 몸무게 차이 계산 로직 추후 추가 */}
                      지난 기록 대비 <span> {weightChangeText}</span>
                    </WeightChange>
                  </Value>
                </RecordItem>
                <RecordItem>
                  <Label>식사량</Label>
                  <MealValue>{healthRecord?.latestRecord.mealAmount}</MealValue>
                </RecordItem>

                <RecordItem>
                  <Label>특이 증상</Label>
                  <Value>
                    {healthRecord?.latestRecord.atypicalSymptom || '없음'}
                  </Value>
                </RecordItem>

                {healthRecord && healthRecord?.latestRecord.diagnosisName && (
                  <RecordItem>
                    <Label>진료 내역</Label>
                    <HospitalRecordValue>
                      <RecordRow>
                        <ListTitle>진단명</ListTitle>
                        <RecordText>
                          {healthRecord?.latestRecord.diagnosisName || '없음'}
                        </RecordText>
                      </RecordRow>
                      <RecordRow>
                        <ListTitle>검사 및 처방 내역</ListTitle>
                        <RecordText>
                          {healthRecord?.latestRecord.prescription || '없음'}
                        </RecordText>
                      </RecordRow>
                    </HospitalRecordValue>
                  </RecordItem>
                )}
              </HealthRecord>
            </PetDetails>
          </>
        ) : (
          <EmptyState>
            <Logo src={logo} alt='반려동물 없음' />
            <EmptyText>
              이런! 등록된 반려 소동물이 없네요.
              <br />
              반려 소동물을 등록해볼까요?
            </EmptyText>
            <RegisterButton onClick={() => navigate('/pet-register')}>
              나의 반려 소동물 등록하기
            </RegisterButton>
          </EmptyState>
        )}
      </Container>
    </>
  );
};

export default HealthProfile;

const Loading = styled.div`
  text-align: center;
  font-size: 16px;
  margin-top: 20px;
`;

const PageTitle = styled.h1`
  font-weight: 600;
  font-size: 22px;
  text-align: center;
  margin-top: 34px;
`;

const EmptyState = styled.div`
  text-align: center;
  margin-top: 115px;
  width: 343px;
  height: 248.31px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
`;

const Logo = styled.img`
  width: 120px;
`;

const EmptyText = styled.p`
  font-size: 16px;
  color: #262627;
  line-height: 1.5;
  margin: 0;
`;

const RegisterButton = styled.button`
  background-color: #6ea8fe;
  color: white;
  font-size: 16px;
  font-family: 'Pretendard';
  font-weight: 600;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  height: 50px;
`;

const PetList = styled.div`
  display: flex;
  gap: 8px;
  height: 30px;
  overflow-x: auto;
  white-space: nowrap;
  flex-wrap: nowrap;
  max-width: 100%;
`;

const PetItem = styled.div<{ isSelected: boolean }>`
  width: fit-content;
  height: 30px;
  border-radius: 30px;
  border: 1px solid ${({ isSelected }) => (isSelected ? '#6ea8fe' : '#E6E6E6')};
  color: ${({ isSelected }) => (isSelected ? '#262627' : '#737373')};
  padding: 2px 12px 2px 6px;
  padding: 2px 12px 2px 6px;
  display: flex;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  box-sizing: border-box;
  align-items: center;
  cursor: pointer;
`;

const PetImg = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50px;
`;

const Container = styled.div`
  width: 100%; /* 전체 화면 너비 적용 */
  padding: 16px 25px; /* 좌우 패딩 조정 */
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box; /* 패딩 포함한 전체 크기 유지 */
`;

const PetDetails = styled.div`
  margin-top: 20px;
  padding: 18px 21px;
  width: 343px;
  height: 483px;
  border-radius: 10px;
  box-shadow: 0px 2px 5px 0px #0000001a;
  box-sizing: border-box;
`;

const PetCard = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  height: 64px;
  justify-content: space-between;
`;

const PetImgLarge = styled.img`
  width: 50px;
  height: 60px;
  border-radius: 5%;
  opacity: 90%;
`;

const PetInfo = styled.div`
  flex: 1; /* 남은 공간을 차지하도록 설정 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  height: 64px;
  mar
`;

const PetName = styled.h3`
  <font-weight: 600;
  font-size: 16px;
  color: #000000;
  margin: 0;
`;

const PetDetail = styled.div`
  display: flex;
  gap: 4px;
  height: 22px;
  font-weight: 600;
  font-size: 10px;
  align-items: center;
  margin: 0;
`;

const PetBirthDate = styled.p`
  color: #737373;
`;

const AnimalIcon = styled.img`
  width: 12px;
`;

const GenderIcon = styled.span<{ gender: 'female' | 'male' }>`
  font-weight: 600;
  font-size: 12px;
  color: ${({ gender }) => (gender === 'female' ? '#C76B6B' : '#6EA8FE')};
`;

const RecentUpdate = styled.p`
  color: #737373;
  font-size: 10px;
  font-weigt: 500;
  margin: 0;
`;

const HealthBadge = styled.img`
  height: 20px;
`;
const HealthRecord = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RecordItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #262627;
  font-weight: 600;
  font-size: 14px;
`;

const Label = styled.div`
  height: 22px;
`;

const Value = styled.div`
  box-sizing: border-box;
  padding: 12px 18px;
  display: flex;
  justify-content: space-between;
  background-color: #fafafa;
  border-radius: 10px;
  height: 50px;
  align-items: center;
`;

const WeightChange = styled.div`
  height: 22px;
  width: auto;
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: #737373;
  align-items: center;
  font-weight: 500;
  font-family: 'Pretendard';
  span {
    font-size: 12px;
    font-weight: 600;
    color: #262627;
    margin-left: 8px;
  }
`;
const MealValue = styled(Value)`
  color: #6ea8fe;
`;

const HospitalRecordValue = styled.div`
  box-sizing: border-box;
  padding: 12px 18px;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 2px 5px 0px #0000001a;
  gap: 6px;
`;

const RecordRow = styled.div`
  display: flex;
  align-items: center;
  height: 22px;
  gap: 8px;
`;

const ListTitle = styled.p`
  font-weight: 600;
  font-size: 12px;
  color: #737373;
  margin: 0;
`;

const RecordText = styled.p`
  font-weight: 600;
  font-size: 14px;
  color: #262627;
`;
