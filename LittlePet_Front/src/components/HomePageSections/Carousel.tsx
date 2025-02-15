import React from 'react';
import styled from 'styled-components';
import Banner from '@assets/banner/이벤트-광고 배너.svg';

const Carousel: React.FC = () => {
  return <CarouselWrapper src={Banner} alt='광고배너' />;
};

export default Carousel;

const CarouselWrapper = styled.img`
  margin: 0 auto;
  padding: 0;
  height: auto;
  width: 100%;
`;
