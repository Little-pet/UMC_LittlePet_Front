import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SelectableButton from '#/components/Health/RecordHealthButton/SelectableButton';
import FecesColorButton from '#/components/Health/RecordHealthButton/FecesColorButton';
import SelectableButtonGroup from '#/components/Health/RecordHealthButton/SelectableButtonGroup';
import styled from 'styled-components';
import feces1 from '@assets/fecesStatus/적당한 무르기.svg';
import feces2 from '@assets/fecesStatus/딱딱한 똥.svg';
import feces3 from '@assets/fecesStatus/설사.svg';
import feces4 from '@assets/fecesStatus/혈변.svg';
import feces5 from '@assets/fecesStatus/대변 안 봄.svg';
import symptom1 from '@assets/symptoms/식욕 감소.svg';
import symptom2 from '@assets/symptoms/기력 저하.svg';
import symptom3 from '@assets/symptoms/구토.svg';
import symptom4 from '@assets/symptoms/기침.svg';
import symptom5 from '@assets/symptoms/이상 행동.svg';
import symptom6 from '@assets/symptoms/털 빠짐.svg';
import symptom7 from '@assets/symptoms/체온 감소.svg';
import symptom8 from '@assets/symptoms/체온 상승.svg';
import symptom9 from '@assets/symptoms/분비물.svg';
import symptom10 from '@assets/symptoms/기타.svg';

const AddHealthRecordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  //현재 선택된 날짜 (쿼리에서 가져오거나 기본값)
  const date =
    searchParams.get('date') || new Date().toISOString().split('T')[0];
  const navigate = useNavigate();

  //식사량
  const mealAmountOptions = [
    { id: '적음', label: '적음' },
    { id: '정상', label: '정상' },
    { id: '많음', label: '많음' },
  ];

  //배변 상태
  const fecesTypes = [
    { id: 1, label: '적당한 무르기', icon: feces1 },
    { id: 2, label: '딱딱한 똥', icon: feces2 },
    { id: 3, label: '설사', icon: feces3 },
    { id: 4, label: '혈변', icon: feces4 },
    { id: 5, label: '대변 안 봄', icon: feces5 },
  ];

  //대변 색
  const fecesColors = [
    { id: 1, label: '갈색', color: '#94714A' },
    { id: 2, label: '검은색', color: '#262627' },
    { id: 3, label: '붉은 색', color: '#C76B6B' },
    { id: 4, label: '누런 색', color: '#F8E79E' },
    { id: 5, label: '초록색', color: '#98D298' },
    { id: 6, label: '회백색', color: '#E6E6E6' },
  ];

  //특이 증상
  const Symptoms = [
    { id: 1, label: '식욕 부진', icon: symptom1 },
    { id: 2, label: '기력 저하', icon: symptom2 },
    { id: 3, label: '구토', icon: symptom3 },
    { id: 4, label: '기침', icon: symptom4 },
    { id: 5, label: '이상 행동', icon: symptom5 },
    { id: 6, label: '털 빠짐', icon: symptom6 },
    { id: 7, label: '체온 감소', icon: symptom7 },
    { id: 8, label: '체온 상승', icon: symptom8 },
    { id: 9, label: '분비물', icon: symptom9 },
    { id: 10, label: '기타', icon: symptom10 },
  ];

  // 건강 상태 선택 옵션
  const healthStatusOptions = [
    { id: '악화', label: '악화' },
    { id: '양호', label: '양호' },
    { id: '건강', label: '건강' },
  ];

  // 병원 내진 여부 선택 옵션
  const HospitalVisitOptions = [
    { id: 'o', label: 'O' },
    { id: 'x', label: 'X' },
  ];

  // 입력 데이터 상태 관리
  const [formData, setFormData] = useState({
    weight: '',
    mealAmount: '',
    fecesStatus: '',
    fecesColor: '',
    symptoms: '',
    healthStatus: '',
    hospitalVisit: '',
    diagnosis: '',
    treatmentDetails: '',
    otherSymptoms: '',
  });

  const [selectedFecesType, setSelectedFecesType] = useState<number | null>(
    null
  );
  const [selectedFecesColor, setSelectedFecesColor] = useState<number | null>(
    null
  );
  const [selectedSymptoms, setSelectedSymptoms] = useState<number | null>(null);

  // 입력 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  //클릭 핸들러
  const handleSelect = (name: string, value: number) => {
    if (name === 'fecesType') setSelectedFecesType(value);
    if (name === 'fecesColor') setSelectedFecesColor(value);
    if (name === 'symptoms') setSelectedSymptoms(value);
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 폼 기본 제출 동작 방지

    if (
      !formData.weight ||
      !formData.mealAmount ||
      !formData.fecesColor ||
      !formData.healthStatus ||
      !formData.fecesStatus ||
      !formData.hospitalVisit ||
      !formData.diagnosis ||
      !formData.treatmentDetails
    ) {
      alert('필수 입력 항목을 확인해주세요!');
      return;
    }
    /*추후 백엔드와 연동시 수정*/
    try {
      const response = await fetch('/api/health-records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, date }),
      });

      if (response.ok) {
        navigate(
          `/health/record/detail/${searchParams.get('petId')}?date=${date}`
        );
      } else {
        alert('저장 실패! 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('저장 오류:', error);
      alert('서버 오류가 발생했습니다.');
    }
  };

  return (
    <Container>
      <Title>건강 기록하기</Title>
      <Form>
        <InputGroup>
          <Label>
            체중 <span>*</span>
          </Label>
          <WeightInputContainer>
            <WeightInput
              type='text'
              name='weight'
              value={formData.weight}
              onChange={handleChange}
              placeholder='0.00'
            />
            <Unit>kg</Unit>
          </WeightInputContainer>
        </InputGroup>

        <InputGroup>
          <Label>
            식사량 <span>*</span>
          </Label>
          <SelectableButtonGroup
            name='mealAmount'
            options={mealAmountOptions}
            selectedValue={formData.mealAmount}
            onSelect={handleSelectChange}
          />
        </InputGroup>

        <SelectGroup>
          <Label>
            배변 형태 <span>*</span>
          </Label>
          <SelectableButton
            name='fecesType'
            options={fecesTypes}
            selectedOption={selectedFecesType}
            onSelect={handleSelect}
          />
        </SelectGroup>

        <SelectGroup>
          <Label>
            대변 색 <span>*</span>
          </Label>
          <FecesColorButton
            name='fecesColor'
            options={fecesColors}
            selectedOption={selectedFecesColor}
            onSelect={handleSelect}
          />
        </SelectGroup>

        <SelectGroup>
          <Label>특이 증상</Label>
          <SelectableButton
            name='symptoms'
            options={Symptoms}
            selectedOption={selectedSymptoms}
            onSelect={handleSelect}
          />
        </SelectGroup>

        {selectedSymptoms === 10 && (
          <InputGroup>
            <Input
              name='otherSymptoms'
              value={formData.otherSymptoms}
              onChange={handleChange}
              placeholder='기타 특이 증상을 적어주세요'
            />
          </InputGroup>
        )}

        <InputGroup>
          <Label>
            건강 상태 <span>*</span>
          </Label>
          <SelectableButtonGroup
            name='healthStatus'
            options={healthStatusOptions}
            selectedValue={formData.healthStatus}
            onSelect={handleSelectChange}
          />
        </InputGroup>

        <InputGroup>
          <Label>
            병원 내진 여부 <span>*</span>
          </Label>

          <SelectableButtonGroup
            name='hospitalVisit'
            options={HospitalVisitOptions}
            selectedValue={formData.hospitalVisit}
            onSelect={handleSelectChange}
          />
        </InputGroup>

        {formData.hospitalVisit === 'o' && (
          <>
            <InputGroup>
              <Label>
                진단명 <span>*</span>
              </Label>
              <Input
                name='diagnosis'
                value={formData.diagnosis}
                onChange={handleChange}
                placeholder='진단명을 입력하세요'
              />
            </InputGroup>

            <InputGroup>
              <Label>
                검사 및 처방 내역 <span>*</span>
              </Label>
              <Input
                name='treatmentDetails'
                value={formData.treatmentDetails}
                onChange={handleChange}
                placeholder='검사 및 처방 내용을 입력하세요'
              />
            </InputGroup>
          </>
        )}

        <SaveButton onClick={() => handleSubmit}>저장하기</SaveButton>
      </Form>
    </Container>
  );
};

export default AddHealthRecordPage;

const Container = styled.div`
  padding: 0 25px;
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e6e6e6;
  align-items: center;
  height: 26px;
  gap: 12px;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 14px;
  white-space: nowrap;
  width: auto;
  span {
    color: #c76b6b;
  }
`;

const WeightInputContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding: 10px;
  font-size: 16px;
  background-color: #fff;
  width: 100%;
  box-sizing: border-box;
  height: 22px;
`;

const WeightInput = styled.input`
  border: none;
  font-size: 14px;
  font-weight: 600;
  text-align: right;
  font-family: 'Pretendard';
  width: 100%;
  outline: none;
  ::placeholder {
    color: #737373;
  }
`;

const Unit = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #262627;
  margin-left: 5px;
`;

const Input = styled.input`
  border: none;
  font-size: 14px;
  font-weight: 600;

  font-family: 'Pretendard';
  width: 100%;
  outline: none;
  ::placeholder {
    color: #737373;
  }
`;

const SelectGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SaveButton = styled.button`
  background-color: #6ea8fe;
  color: white;
  height: 48px;
  font-family: 'Pretendard';
  font-weight: 600;
  padding: 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
