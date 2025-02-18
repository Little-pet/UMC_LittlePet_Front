import React from 'react';
import closeIcon from '#/assets/close.svg';
import { motion } from 'framer-motion';
import HospitalItem from './HospitalItem';
//import HospitalImg from '#/assets/image.png';
import styled from 'styled-components';
interface Info {
  id: number;
  name: string;
  address: string;
  closedDay: string;
  latitude?: number;
  longitude?: number;
  imageUrl: string;
  openingHours: string;
  phoneNumber: string;
  rating: number;
}
interface InfoModalProps {
  onClose: () => void;
  info: Info;
}
const InfoModal: React.FC<InfoModalProps> = ({ onClose, info }) => {
  const openingHoursArray = info.openingHours.split('\n');
  const getTodayDay = () => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const today = new Date();
    return days[today.getDay()]; // 오늘의 요일을 반환 (예: '월')
  };
  const today = getTodayDay();
  // 오늘의 요일에 해당하는 항목을 선택
  const todayOpeningHour = openingHoursArray.find((item) =>
    item.startsWith(today)
  );
  console.log(info);
  return (
    <Container
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
    >
      <div
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          padding: '0 40px',
        }}
      >
        <div style={{ fontSize: '22px', fontFamily: 'Pretendard-SemiBold' }}>
          병원정보
        </div>
        <img
          src={closeIcon}
          onClick={onClose}
          style={{ position: 'absolute', right: '40px', cursor: 'pointer' }}
        />
      </div>
      <HospitalItem
        imageSrc={info.imageUrl}
        hospitalId={info.id}
        name={info.name}
        rating={info.rating}
        comments={0}
        openStatus={todayOpeningHour}
      />
    </Container>
  );
};
export default InfoModal;
const Container = styled(motion.div)`
  width: 100%;
  height: 229px;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  box-sizing: border-box;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  gap: 25px;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: white;
  z-index: 10;
`;
