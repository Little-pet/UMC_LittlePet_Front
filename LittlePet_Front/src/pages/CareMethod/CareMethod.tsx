import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
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
  );
};

export default CareMethodPage;

// Styled Components
const Container = styled.div`
  padding: 25px;
`;

const Header = styled.div`
  width: 100%;
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 600;
  margin-top: 11px;
  text-align: center;
`;
const ButtonList = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
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
