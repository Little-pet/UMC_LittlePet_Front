import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';
import warning from '@assets/warning.svg';

//토스트가 나타나는 애니메이션
const slideDown = keyframes`
  from {
    transform: translate(-50%, -50px);
    opacity: 0;
  }
  to {
    transform: translate(-50%, 0);
    opacity: 1;
    }`;

// 토스트가 사라지는 애니메이션
const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // 3초 후 자동 닫힘
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return ReactDOM.createPortal(
    <ToastContainer isVisible={isVisible}>
      <ToastTextContainer>
        <WarningIcon src={warning} />
        <WarningMessage>{message}</WarningMessage>
      </ToastTextContainer>
    </ToastContainer>,
    document.body // 최상위 레벨에서 렌더링
  );
};

export default Toast;

const ToastContainer = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 54px;
  left: 50%;
  height: 50px;
  transform: translate(-50%, 0);
  background-color: #000000b2;
  box-shadow: 0px 2px 5px 0px #0000001a;
  width: 343px;
  padding: 13px 56px;
  box-sizing: border-box;
  border-radius: 10px;
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  animation: ${({ isVisible }) => (isVisible ? slideDown : fadeOut)} 0.3s
    ease-in-out;
`;

const ToastTextContainer = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  gap: 20px;
`;

const WarningIcon = styled.img`
  height: 24px;
`;

const WarningMessage = styled.p`
  color: white;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
`;
