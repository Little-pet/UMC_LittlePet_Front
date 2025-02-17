import closeIcon from '#/assets/close.svg';
import { motion } from 'framer-motion';
import HospitalItem from './HospitalItem';
import HospitalImg from '#/assets/image.png';
import styled from 'styled-components';
interface InfoModalProps {
  onClose: () => void;
}
const InfoModal: React.FC<InfoModalProps> = ({ onClose, info }) => {
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
        openStatus={info.openingHours}
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
