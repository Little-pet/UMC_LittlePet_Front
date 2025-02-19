import React from 'react';
import styled from 'styled-components';
import Banner from '@assets/banner/이벤트-광고 배너.svg';

const Carousel: React.FC = () => {
  return (
    <CarouselWrapper>
      <object type='image/svg+xml' data={Banner}>
        <img src={Banner} alt='광고배너' />
      </object>
    </CarouselWrapper>
  );
};

export default Carousel;

const CarouselWrapper = styled.div`
  margin: 0 auto;
  padding: 0;
  width: 100%;

  height: auto;

  object {
    width: 100%;
    height: auto;
  }

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;
