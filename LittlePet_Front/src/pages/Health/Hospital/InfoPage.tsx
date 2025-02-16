import styled from 'styled-components';
import clockIcon from '#/assets/진료시간 아이콘.svg';
import callIcon from '#/assets/전화.svg';
import boardIcon from '#/assets/연중무휴 아이콘.svg';
import { useHospitalStore } from '#/context/hospitalStore';
const InfoPage = () => {
  const { hospitalDetail } = useHospitalStore();

  if (!hospitalDetail) return <div>Loading...</div>;
  return (
    <Details>
      <Title>병원 정보</Title>
      <Box>
        <img src={clockIcon} />
        <OpenStatus>진료중</OpenStatus>
        <Text>24시간 영업</Text>
      </Box>
      <Box>
        <img src={boardIcon} />
        <Text>{hospitalDetail.closedDay}</Text>
      </Box>
      <Box>
        <img src={callIcon} />
        <Text>02-1234-5678</Text>
      </Box>
    </Details>
  );
};
export default InfoPage;
const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 25px;
  @media only screen and (min-width: 800px) {
    padding: 20px 96px;
  }
`;

const Title = styled.div`
  font-size: 18px;
  font-family: Pretendard-SemiBold;
  color: black;
`;

const Box = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Text = styled.div`
  font-size: 12px;
  font-family: Pretendard-Medium;
  color: #737373;
`;

const OpenStatus = styled.div`
  font-size: 12px;
  font-family: Pretendard-Medium;
  color: #6ea8fe;
`;
