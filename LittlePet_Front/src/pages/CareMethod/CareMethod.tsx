import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import banner from '@assets/banner-caremethod.svg';
import {
  mainCategories,
  subCategories,
  animals,
} from '#/mockData/animalCareData';

const CareMethodPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<keyof typeof subCategories>('전체');
  const navigate = useNavigate();

  // 특정 소동물 클릭 시 이동하는 함수
  const handleAnimalClick = (link: string) => {
    if (link) {
      navigate(link); // 🟢 해당 링크로 이동
    }
  };

  return (
    <>
      <ContainerWrapper>
        <Banner src={banner} />
        <Container>
          <Header>
            <Title>어떤 소동물이 궁금하신가요?</Title>
            <ButtonList>
              {mainCategories.map((category) => (
                <CategoryButton
                  key={category}
                  onClick={() =>
                    setSelectedCategory(category as keyof typeof subCategories)
                  }
                  isSelected={selectedCategory === category}
                >
                  {category}
                </CategoryButton>
              ))}
            </ButtonList>
          </Header>

          {/* Content */}
          <Content>
            <CategoryGrid>
              {subCategories[selectedCategory].map((id) => {
                const item = animals.find((animal) => animal.id === id);

                return (
                  item && (
                    <CategoryItem
                      key={item.id}
                      src={item.image}
                      alt={item.name}
                      onClick={() => handleAnimalClick(item.link)}
                    />
                  )
                );
              })}
            </CategoryGrid>
          </Content>
        </Container>
      </ContainerWrapper>
    </>
  );
};

export default CareMethodPage;

// Styled Components

const Banner = styled.img`
  width: 100vw;
  @media (max-width: 800px) {
    display: none;
  }
`;

const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Container = styled.div`
  padding: 25px;
`;

const Header = styled.div`
  width: 100%;
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 600;
  margin-top: 49px;
  text-align: center;
  @media (min-width: 800px) {
    font-size: 26px;
    line-height: 22px;
  }
`;
const ButtonList = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 42px;
  @media (min-width: 800px) {
    justify-content: center;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 23px;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 2-column layout */
  gap: 10px;
  width: 100%;
  @media (min-width: 800px) {
    justify-content: space-between;
    grid-template-columns: repeat(5, 1fr);
    width: 855px;
  }
`;

const CategoryButton = styled.button<{ isSelected: boolean }>`
  padding: 6px 12px;
  font-size: 10px;
  background-color: ${({ isSelected }) => (isSelected ? '#6EA8FE' : '#E6E6E6')};
  color: ${({ isSelected }) => (isSelected ? '#fff' : '#737373')};
  border-radius: 5px;
  border: none;
  cursor: pointer;
  height: 27px;
  width: 50px;
  font-family: 'Pretendard';
  font-weight: 500;
`;

const CategoryItem = styled.img`
  width: 100%;
`;
